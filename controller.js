import "dotenv/config";
import MatchRequestModel from "./MatchRequest.js";

//Set up mongoose connection
import mongoose from "mongoose";
import TaskE from "./TaskE.js";
import redis, { createClient } from "redis";

let mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

const redisClient = createClient({ legacyMode: true });
redisClient.connect();

export async function createMatch(req, res) {
  try {
    const { email, difficulty } = req.body;
    if (difficulty != "hard" && difficulty != "easy") {
      return res
        .status(400)
        .json({ message: "difficulty can only be hard or easy" });
    }
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
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Missing body" });
  }
  const matchRequest = await MatchRequestModel.findOne({ email: email });

  if (matchRequest) {
    return res
      .status(201)
      .json({ email: email, difficulty: matchRequest.difficulty });
  } else {
    return res.status(400).json({ message: "No request found" });
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
    const { email, difficulty, newDiffculty } = req.body;
    const matchRequest = await MatchRequestModel.findOne({
      email: email,
      difficulty: difficulty,
    });

    if (!matchRequest) {
      return res.status(400).json({ message: "No request found" });
    }

    const resp = await MatchRequestModel.updateOne(
      {
        email: email,
        difficulty: difficulty,
      },
      { difficulty: newDiffculty }
    );
    console.log("TEST", resp);
    if (resp.error) {
      return res
        .status(400)
        .json({ message: "Error with updating match request" });
    } else {
      return res.status(200).json({ message: "Match request updated" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Missing body" });
  }
}

export async function retrieveLargeData(req, res) {
  const { gender } = req.query;
  if (!gender) {
    res.status(400).json({ message: "Missing body" });
  }

  redisClient.get(`gender=${gender}`, async (error, records) => {
    if (records != null) {
      console.log("Cache Hit");
      res.status(201).json(JSON.parse(records));
    } else {
      const records = await TaskE.find({ gender: gender });
      redisClient.setEx(`gender=${gender}`, 3600, JSON.stringify(records));
      res.status(201).json(records);
    }
  });
}
