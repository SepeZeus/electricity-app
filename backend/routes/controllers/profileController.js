import { getUserByEmail, updateUser } from "../../services/userService.js";
import { validator } from "../../src/deps.js";

const updateProfile = async (req, res) => {
  const { kWh, email } = await req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(404).json({ message: "Failed to load profile for user" });
    //res.send({loggedIn: false});
  } else {
    //data must be present and in expected format
    if (!validator.isNumeric(kWh)) {
      console.log("Failed");
      res.status(500).json({ message: "invalid value for vuosikulutus" });
      //res.send({loggedIn: false});
    } else {
      await updateUser(user, { kWh: kWh });
      res.status(200).json({ message: "Successfully updated user" });
    }
  }
};

export { updateProfile };
