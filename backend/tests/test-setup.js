// Import necessary modules
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
let mongoUri;

// Set up test environment
const tempDBConnect = async () =>{  
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { dbName: 'testDB' });
};

// Tear down test environment
const tempDBDisconnect = async () =>{
    await mongoose.disconnect();
    await mongoServer.stop();
};

export {tempDBConnect, tempDBDisconnect};
