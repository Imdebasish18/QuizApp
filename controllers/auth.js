const mongoose = require("mongoose"); //New
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const dotenv = require("dotenv");
const { ObjectId } = mongoose.Types;

dotenv.config({ path: "../.env" });

const {
  User,
  Question,
  ComputerOrganization,
  ProgrammingUsingC,
  DSA,
} = require("../models/user.js");

const express = require("express");
const app = express();
app.use(express.json());

//new
main()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error:", err));

async function main() {
  // await mongoose.connect("mongodb://localhost:27017/userData");
  // await mongoose.connect(process.env.MONGO_URL);
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

exports.register = async (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  try {
    // Check if the email already exists in the database
    let existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return res.render("RegisterForm", {
        message: "This email is already in use!",
        name: req.body.name,
        email: req.body.email,
      });
    }

    // Insert the new user data into the database
    await User.insertMany([data]);
    res.render("RegisterForm", {
      message: "",
      name: req.body.name,
      email: req.body.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while registering the user");
  }
};

//Experiment:

exports.login = async (req, res) => {
  //---------------------------------
  try {
    // Check if the email already exists in the database
    let existingUser = await User.findOne({ email: req.body.email });

    if (existingUser && existingUser.password == req.body.password) {
      return res.render("temporary");
    } else if (!existingUser) {
      return res.render("LoginForm", {
        message1: "Wrong details or Register first!",
        email: req.body.email,
        message2: "",
      });
    } else {
      return res.render("LoginForm", {
        message1: "",
        message2: "Password is incorrect!",
        email: req.body.email,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while registering the user");
  }
};

const models = { ComputerOrganization, DSA, ProgrammingUsingC };

const fetchRandomDocument = async (modelName) => {
  try {
    const model = models[modelName];
    if (!model) {
      throw new Error(`Model for collection ${modelName} does not exist`);
    }

    // Fetch a random document
    const count = await model.countDocuments();
    if (count === 0) {
      throw new Error("No documents found in the collection");
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomDocument = await model.findOne().skip(randomIndex);

    return randomDocument;
  } catch (err) {
    throw new Error(`Failed to fetch random document: ${err.message}`);
  }
};

exports.question = async (req, res) => {
  const { collectionName } = req.params;

  try {
    const randomQuestion = await fetchRandomDocument(collectionName);
    // console.log(randomQuestion);
    res.render("question", { randomQuestion, collectionName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchRandomModel = async (modelName, id) => {
  try {
    const model = models[modelName];
    if (!model) {
      throw new Error(`Model for collection ${modelName} does not exist`);
    }
    const questionDocument = await model.findById(id);
    return questionDocument.answer;
  } catch (err) {
    throw new Error(`Failed to fetch random document: ${err.message}`);
  }
};

exports.answer = async (req, res) => {
  const { collectionName, answer, userAnswer, id } = req.body;

  try {
    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid document ID" });
    }

    let userGivenAnswer = userAnswer.trim();
    // Compare the value

    const isMatch = answer == userGivenAnswer;

    res.json({ isMatch });
  } catch (error) {
    console.error("Error checking answer:", error);
    res.status(500).send("Internal Server Error");
  }
};

//this route is for testing purpose:
exports.test = (req, res) => {
  console.log("request is accepted in test route");
};
