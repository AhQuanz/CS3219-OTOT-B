import MatchRequestModel from "./MatchRequest.js";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB = "mongodb://localhost:27017/taskB";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

export async function createMatch(req, res) {
  try {
    const { email, difficulty } = req.body;
    const newRequest = new MatchRequestModel({ email, difficulty });
    const resp = await newRequest.save();
    if (resp.err) {
      return res.status(400).json({ message: "Error with creating a match" });
    } else {
      return res.status(201).json({ message: "Match created sucessfully" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Missing body" });
  }
}
export async function retrieveMatch(req, res) {
  try {
    const { email } = req.body;
    const matchRequest = await MatchRequestModel.findOne({ email: email });

    if (matchRequest) {
      return res
        .status(201)
        .json({ email: email, difficulty: matchRequest.difficulty });
    } else {
      return res.status(400).json({ message: "No request found" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Missing body" });
  }
}
export async function deleteMatch(req, res) {
  try {
    const { email, difficulty } = req.body;
    const resp = await MatchRequestModel.deleteOne({
      email: email,
      difficulty: difficulty,
    });

    if (resp.error) {
      return res.status(400).json({ message: "No request found" });
    } else {
      return res.status(201).json({ message: "Match deleted" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Missing body" });
  }
}
export async function updateMatch(req, res) {
  try {
    const { email, difficulty, newDifficulty } = req.body;

    const matchRequest = await MatchRequestModel.findOne({
      email: email,
      difficulty: difficulty,
    });

    if (!matchRequest) {
      return res.status(400).json({ message: "No request found" });
    }

    const resp = await MatchRequestModel.updateOne({
      email: email,
      difficulty: newDifficulty,
    });

    if (resp.error) {
      return res
        .status(400)
        .json({ message: "Error with updating match request" });
    } else {
      return res.status(201).json({ message: "Match request updated" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Missing body" });
  }
}
