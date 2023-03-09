import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

function onlyNumbers(array: number[]) {
  return array.every((element) => {
    return !isNaN(element);
  });
}

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const queries = req.query;
  console.log(queries);
  let height: number;
  let weight: number;

  try {
    height = Number(queries.height);
    weight = Number(queries.weight);
    const message = calculateBmi(height, weight);

    res.status(200).json({
      height: height,
      weight: weight,
      bmi: message,
    });
  } catch (error) {
    res.status(401).send({ error: "malformed query parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // const body = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const target = req.body.target as number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const dailyExercises = req.body.daily_exercises as Array<number>;

  if (!target || !dailyExercises) {
    res.status(401).json({
      error: "missing parameters",
    });
    return;
  }

  const isNumberArray: boolean = onlyNumbers(dailyExercises);

  if (isNaN(target) || !isNumberArray) {
    console.log(target);
    console.log(isNaN(target));
    console.log("isNumberArray: ", isNumberArray);
    res.status(401).json({
      error: "malformed parameters",
    });
    return;
  }

  try {
    const result = calculateExercises(dailyExercises, target);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "malformed parameters",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
