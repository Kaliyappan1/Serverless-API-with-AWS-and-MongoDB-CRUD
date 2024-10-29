"use strict";

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://lambdaUser:Kali123@kaliyappan.8uabkqs.mongodb.net/?retryWrites=true&w=majority&appName=kaliyappan"
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);

  try {
    const newUser = await User.create(data);

    return {
      statusCode: 200,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
module.exports.read = async (event) => {
  try {
    const users = await User.find();

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};

module.exports.update = async (event) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);

  try {
    const users = await User.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
module.exports.delete = async (event) => {
  const { id } = event.pathParameters;

  try {
    const users = await User.findByIdAndDelete(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
