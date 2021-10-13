const mongoose = require("mongoose");
const bcryptPlugin = require("mongoose-bcrypt");
const searchPlugin = require("./search.plugin");
const statsPlugin = require("./statistics.plugin");

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter username!"],
      unique: [true, "Username already in use!"],
      validate: {
        validator: function (username) {
          return !["admin"].includes(username.toLowerCase());
        },
        message: "Username already taken!",
      },
      lowercase: true,
      trim: true,
    },
    fullName: { type: String, require: [true, "Please enter your name!"] },
    email: {
      type: String,
      required: [true, "Please enter your email address!"],
      unique: [true, "Email already in use!"],
    },
    password: {
      type: String,
      select: false,
      bcrypt: true,
      required: [true, "Please enter password!"],
    },
    roles: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

Schema.plugin(bcryptPlugin, { rounds: 8 });
Schema.plugin(searchPlugin, ["username"]);
Schema.plugin(statsPlugin);

module.exports = mongoose.model("User", Schema);
