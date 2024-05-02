import { getUserByEmail } from "../../services/userService.js";
import { bcrypt, validator } from "../../src/deps.js";

const loginUser = async (req, res) => {
  const { email, salis } = await req.body;
  //avoids errors
  if (email && salis && validator.isEmail(email)) {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(500).json({ message: "Invalid email or password" });
      //res.send({loggedIn: false});
    } else {
      //as goD intended
      //if emails or password hashes do not match, then can't login
      const passMatch = await bcrypt.compare(salis, user.password);
      if (user.email === email && passMatch) {
        res.status(200).json({
          authenticated: true,
          email: user.email,
          message: "Logged user in",
        });
      } else res.status(401).json({ message: "Invalid email or password" });
    }
  }
};

export { loginUser };
