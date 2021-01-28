//dbConnection

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

router.get("/api", (req, res, next) => {
  res.send("Welcome To YDT Tech");
});

var db;
var dbURL =
  "mongodb+srv://Satyam_Agarwal:krd@25611@cluster0.oxrni.mongodb.net/Satyam?retryWrites=true&w=majority";

// DB connection
MongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, dbClient) => {
  if (err) throw err;
  db = dbClient.db("Satyam");
  console.log("connected to usersdb");
});

//user Register
router.get("/register", (req, res, next) => {
  var register = {
    fullname: req.query.fullname,
    Email: req.query.Email,
    phone: req.query.phone,
    password: req.query.password,
  };
  console.log(req);
  db.collection("user").insertOne(register, function (err, result) {
    if (err) throw err;
    console.log("document inserted");
    res.send(result);
  });
});

//user login validation
router.post("/login", (req, res, next) => {
  console.log(req);
  console.log(req.body.email);
  var Email = { Email: req.body.email };
  var password = { password: req.body.password };

  db.collection("user")
    .find({ $and: [Email, password] }, { projection: { password: 0 } })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});

//Student Add
router.get("/addstudent", (req, res, next) => {
  console.log("hello ")
  var register = {
    Student_Roll: req.query.stuRoll,
    Student_Name: req.query.stuName,
    Student_Age: req.query.stuAge,
    Student_Class: req.query.stuClass,
    Student_DOB:req.query.stuDate,
  };
  db.collection("student_data").insertOne(register, function (err, result) {
    if (err) throw err;
    console.log("document inserted");
    res.send(result);
  });
});

// Student data fetch
router.get("/student/fetch", (req, res, next) => {
  db.collection("student_data")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});
//Student Roll Number Serch
router.get("/stusearch", (req, res, next) => {
  var Roll = req.query.stuRoll;
  db.collection("student_data")
    .find({ Student_Roll: Roll }, { _id: 0 })
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result)
      res.send(result);
    });
});
app.listen(port, () => {
  console.log("server is running on port" + port);
});
