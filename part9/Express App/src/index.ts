import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use(diagnosesRouter);
app.use(patientRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
