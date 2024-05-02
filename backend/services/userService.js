import {User} from "../database/schemas.js";

//add a user based on their email, and store their encrypted version of the given password
const addUser = async (email, encryptedPass, admin=false) =>{
    const newUser = new User({
        email: email,
        password: encryptedPass,
        admin: admin
    });

    await newUser.save()
    .then(user => {
        console.log("User Added", user);
    })
    .catch(e =>{
        console.error("Error adding user:", e);
    });
};

//find a user in the database (mainly for login)
const getUserByEmail = async (email) =>{
    try{
        const user = await User.findOne({email: email});
        if (!user){
            console.log("User does not exist in DB");
            return null
        }
        console.log("User found")
        return user
    } catch(error){
        console.error('Error finding user: ', error);
        throw error;
    }
};

const updateUser = async (user, updateData) => {
    try {
      // Update the specific property (kWh)
      user.kWh = updateData.kWh;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      console.log("User updated successfully:")//, updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

export {addUser, getUserByEmail, updateUser};