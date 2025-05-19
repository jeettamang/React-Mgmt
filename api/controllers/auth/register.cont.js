const { validationError, errorMessage } = require("../../library/functions");
const bcrypt = require("bcryptjs");
const { User } = require("@/models");

class RegisterController {
  register = async (req, res, next) => {
    try {
      let { name, email, password, confirmPassword } = req.body;

      const imageFile = req.file;
      const imagePath = imageFile ? imageFile.filename : null;

      name = name?.trim();
      email = email?.toLowerCase().trim();

      if (!name || !email || !password || !confirmPassword) {
        return validationError(next, {
          general: "All fields are required.",
          debug: {name, email, password, confirmPassword}
        });
      }

      if (password !== confirmPassword) {
        return validationError(next, {
          password: "The password is not confirmed.",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return validationError(next, {
          email: "Email is already registered.",
        });
      }

      const hash = bcrypt.hashSync(password, 10);

      await User.create({ name, email, password: hash, image: imagePath });

      res.status(201).send({
        message: "Thank you for registering. Proceed to log in.",
      });
    } catch (error) {
      errorMessage(next, error);
    }
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
  };
}

module.exports = new RegisterController();
