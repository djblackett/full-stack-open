import express from "express";
import diagnosesService from "../services/diagnosisService";
import { DiagnosisEntry } from "../types";

const router = express.Router();

router.get("/api/diagnoses", (_req, res) => {
  const data: DiagnosisEntry[] = diagnosesService.getEntries();
  res.json(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;
