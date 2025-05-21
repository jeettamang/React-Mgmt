const { Schema, model } = require("mongoose");
const {
  stringRequired,
  booleanTrue,
  modelConfig,
} = require("../library/constants");

const User = model(
  "User",
  new Schema(
    {
      name: stringRequired,

      email: { ...stringRequired, unique: true },

      password: { ...stringRequired, select: false },

      role: {
        type: String,
        enum: ["Admin", "Staff", "Customer"],
        default: "Customer",
      },

      status: booleanTrue,

      // New fields for email verification
      isEmailVerified: {
        type: Boolean,
        default: false,
      },

 emailVerificationCode: {
  type: String,
  select: false,
},
emailVerificationCodeExpires: {
  type: Date,
  select: false,
},

      // Optional: image field if used in registration
  image: {
        type: String,
        default: null,
      },
    },
    modelConfig
  )
);

module.exports = User;
