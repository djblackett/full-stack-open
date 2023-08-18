
import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import cors from "cors";

process.env.NODE_ENV = "production";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }) as ErrorRequestHandler);
// }
//
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.errorHandler());
// }
// app.use(myErrorHandler);
app.use(diagnosesRouter);
app.use(patientRouter);




app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

