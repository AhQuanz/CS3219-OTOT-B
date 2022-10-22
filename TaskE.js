import mongoose from "mongoose";

const Schema = mongoose.Schema;
let TaskE = new Schema({
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },  
  last_name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

export default mongoose.model("TaskE", TaskE);
