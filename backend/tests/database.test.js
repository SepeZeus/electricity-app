// Import necessary modules
//import { chai, sinon, sinonChai } from "../src/deps.js";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { User } from "../database/schemas.js"; // Adjust the path as needed
import { tempDBConnect, tempDBDisconnect } from "./test-setup.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../database/databaseConnection.js";
import { createUser } from "../routes/controllers/registrationController.js";
import { loginUser } from "../routes/controllers/loginController.js";
import { updateProfile } from "../routes/controllers/profileController.js";

chai.use(sinonChai);

// Set up test environment for other tests
before(async () => {
  await tempDBConnect();
});

// Tear down test environment
after(async () => {
  await tempDBDisconnect();
});

//attempt database connection
describe("Database", () => {
  it("Should connect/disconnect successfully", async () => {
    await tempDBDisconnect(); //the tempDB is run by default, disconnect from it here
    let connectionStatus = await connectToDatabase();
    expect(connectionStatus).to.equal(true);
    connectionStatus = await disconnectFromDatabase();
    expect(connectionStatus).to.equal(false);
    await tempDBConnect(); //the tempDB is run by default, reconnect from here, so that other tests may work
  });
});

// Test adding user to database
describe("User Model", () => {
  // Mock the request object
  const mockReq = {
    body: {
      email: "bonke@bonke.org",
      salis: "bonkesriseup",
      vahvistus: "bonkesriseup",
      admin: false,
      kWh: "666",
    },
  };

  let mockRes;
  beforeEach(() => {
    mockRes = sinon.stub();
    mockRes.status = sinon.stub().returns(mockRes); // Chain the stubs
    mockRes.json = sinon.stub();
  });

  afterEach(() => {
    // Restore the original res object behavior after each test
    sinon.restore();
  });

  it("should add a new user", async () => {
    await createUser(mockReq, mockRes);
    expect(mockRes.status).to.have.been.calledWith(200);
    expect(mockRes.json).to.have.been.calledWith({
      message: "Successfully created new user",
    });

    const foundUser = await User.findOne({ email: mockReq.body.email });
    expect(foundUser).to.exist;
  });

  it("should log user in", async () => {
    await loginUser(mockReq, mockRes);
    expect(mockRes.status).to.have.been.calledWith(200);
    expect(mockRes.json).to.have.been.calledWith({
      authenticated: true,
      email: mockReq.body.email,
      message: "Logged user in",
    });
  });

  it("should update user kWh", async () => {
    await updateProfile(mockReq, mockRes);
    expect(mockRes.status).to.have.been.calledWith(200);
    expect(mockRes.json).to.have.been.calledWith({
      message: "Successfully updated user",
    });
  });
});
