import { bcrypt, validator } from "../../src/deps.js";
import { addUser, getUserByEmail } from "../../services/userService.js";

const createUser = async (req, res) => {
  const { email, salis, vahvistus } = await req.body;
  console.log("FUCKALL", email, salis, vahvistus);
  //passwords must match and email must be of form something@something.com (.org, etc work as well)
  if (email && salis && vahvistus) {
    if (salis !== vahvistus || !validator.isEmail(email)) {
      res.status(500).json({ message: "Invalid email or password" });
      //res.send({loggedIn: false});
    } else {
      const user = await getUserByEmail(email);
      if (!user) {
        //can't create the same user twice, this also prevents some potential injections... probably
        //encrypt the password, do not save plaintext
        const salt = 10;
        const encryptedPass = await bcrypt.hash(salis, salt);
        //add user to database, GIVE encrypted password not plaintext one
        await addUser(email, encryptedPass);
        //as goD intended
        //res.redirect('/');
        res.status(200).json({ message: "Successfully created new user" }); //something to tell the frontend that the account creation was succesful
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  } else {
    res.status(500).json({ message: "Invalid Data Provided" });
  }
};

export { createUser };
