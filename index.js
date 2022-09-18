import {
  createMatch,
  retrieveMatch,
  deleteMatch,
  updateMatch,
} from "./controller.js";
// Import express
import express from "express";

// Initialize the app
let app = express();
// Setup server port
var port = 8080;
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/", (req, res) => res.send("Hello World with Express"));
router.post("/findMatch", createMatch);
router.get("/retrieveMatch", retrieveMatch);
router.delete("/deleteMatch", deleteMatch);
router.put("/updateMatch", updateMatch);

app.use("/taskB", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Task B on port " + port);
});

export default app;
