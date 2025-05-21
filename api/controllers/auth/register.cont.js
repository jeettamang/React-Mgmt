const { validationError, errorMessage } = require("../../library/functions");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { User } = require("@/models");

class RegisterController {
  register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const image = req.file?.filename;

      if (!name || !email || !password) {
        return validationError(next, {
          name: !name ? "Name is required." : undefined,
          email: !email ? "Email is required." : undefined,
          password: !password ? "Password is required." : undefined,
        });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return validationError(next, {
          email: "Email is already registered.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        image,
        emailVerificationCode: otp,
        emailVerificationCodeExpires: otpExpiry,
        isEmailVerified: false,
        role: "Customer",
        status: true,
      });

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        to: email,
        subject: "Your OTP Code - Verify Email",
        html: `
          <p>Hello ${name},</p>
          <p>Your OTP for email verification is:</p>
          <h2>${otp}</h2>
          <p>This code will expire in 10 minutes.</p>
        `,
      });

      res.status(201).send({
        message: "Registered successfully. Please check your email for the OTP.",
      });

    } catch (error) {
      console.error("REGISTER ERROR:", error); // Log the actual error
      errorMessage(next, error);
    }
  };

  verifyEmail = async (req, res, next) => {
    try {
      const { email, token } = req.body;
      console.log("VERIFY EMAIL BODY:", req.body);

      if (!email || !token) {
        return validationError(next, {
          email: !email ? "Email is required." : undefined,
          token: !token ? "Token is required." : undefined,
        });
      }

      const user = await User.findOne({ email }).select("+emailVerificationCode +emailVerificationCodeExpires");

      if (!user) {
        return validationError(next, { email: "User not found." });
      }

      console.log("User:", user.email, "OTP:", user.emailVerificationCode);

      if (user.emailVerificationCode !== token) {
        return validationError(next, {
          token: "Invalid token.",
        });
      }

      if (user.emailVerificationCodeExpires < new Date()) {
        return validationError(next, {
          token: "Token has expired.",
        });
      }

      user.isEmailVerified = true;
      user.emailVerificationCode = null;
      user.emailVerificationCodeExpires = null;
      await user.save();

      res.send({
        message: "Email verified successfully. You can now log in.",
      });

    } catch (error) {
      console.error("VERIFY EMAIL ERROR:", error); // Log the actual error
      errorMessage(next, error);
    }
  };

  resendVerification = async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return validationError(next, { email: "Email is required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return validationError(next, { email: "No account found with this email." });
      }

      if (user.isEmailVerified) {
        return validationError(next, { email: "This email is already verified." });
      }

      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      user.emailVerificationCode = newOtp;
      user.emailVerificationCodeExpires = newExpiry;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        to: user.email,
        subject: "Resend OTP - Email Verification",
        html: `
          <p>Hello ${user.name},</p>
          <p>Your new OTP is:</p>
          <h2>${newOtp}</h2>
          <p>This code will expire in 10 minutes.</p>
        `,
      });

      res.send({
        message: "A new OTP has been sent to your email.",
      });

    } catch (error) {
      console.error("RESEND OTP ERROR:", error);
      errorMessage(next, error);
    }
  };
}

module.exports = new RegisterController();
