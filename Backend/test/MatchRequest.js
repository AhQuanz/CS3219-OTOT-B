import mongoose from "mongoose";

const Schema = mongoose.Schema;
let MatchRequestSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

export default mongoose.model("MatchRequestModel", MatchRequestSchema);
