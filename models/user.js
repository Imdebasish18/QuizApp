const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  qs: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Question = new mongoose.model("Question", questionSchema);
const ComputerOrganization = new mongoose.model(
  "ComputerOrganization",
  questionSchema
);
const ProgrammingUsingC = new mongoose.model(
  "ProgrammingUsingC",
  questionSchema
);
const DSA = new mongoose.model("DSA", questionSchema);

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  Question,
  ComputerOrganization,
  ProgrammingUsingC,
  User,
  DSA,
};
