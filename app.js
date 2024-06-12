const express = require("express");
const app = express();
const mongoose = require("mongoose"); //New
const path = require("path");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const {
  User,
  Question,
  ComputerOrganization,
  ProgrammingUsingC,
  DSA,
} = require("./models/user");

dotenv.config({ path: "./.env" });

main()
  .then(() => console.log("database is connected.."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
app.use("/public", express.static(path.join(__dirname, "public")));
const publicDirectory = path.join(__dirname, "/public");
const port = process.env.PORT;

app.use(express.static(publicDirectory));

//Parse URL -encoded bodies (as sent by html fomrs)
app.use(express.urlencoded({ extended: false }));
//parse JSON bodies(as sent by API clients)
app.use(express.json());

app.set("view engine", "ejs");

//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`server started on port ${port}....`);
});

//For rendering the collection name:
app.get("/add/:collection", (req, res) => {
  let { collection } = req.params;

  // console.log(req.query.collection);
  res.render("questionAddingForm", { collection });
});

app.post("/questions", async (req, res) => {
  let data = {
    qs: req.body.qs,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer,
  };
  await Question.insertMany([data]);
  res.send("question submitted..");
});

app.get("/admin", async (req, res) => {
  try {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    const db = client.db("userData");
    const collections = await db.listCollections().toArray();
    await client.close();

    res.render("adminPage", { collections });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching collections");
  }
});

app.get("/question", async (req, res) => {
  let questionList = await Question.find();
  res.render("questionList", { questionList });
});

app.post("/admin/DSA", async (req, res) => {
  let data = {
    qs: req.body.qs,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer,
  };
  await DSA.insertMany([data]);
  res.send("question submitted..");
});

app.post("/admin/C_language", async (req, res) => {
  let data = {
    qs: req.body.qs,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer,
  };
  await ProgrammingUsingC.insertMany([data]);
  res.send("question submitted..");
});

app.post("/admin/Computer_organization", async (req, res) => {
  let data = {
    qs: req.body.qs,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer,
  };
  await ComputerOrganization.insertMany([data]);
  res.send("question submitted..");
});

//this route is testing purpose:
app.get("/test", (req, res) => {
  console.log("test route is working...");
});
