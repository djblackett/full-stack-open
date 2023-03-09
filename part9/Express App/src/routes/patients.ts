import express from "express";
import patientService from "../services/patientService";
import { NonSensitivePatientEntry } from "../types";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/api/patients", (_req, res) => {
  const data: NonSensitivePatientEntry[] =
    patientService.getNonSensitiveEntries();
  res.json(data);
});

router.post("/api/patients", (req, res) => {
  const newPatient = toNewPatientEntry(req.body);
  res.json(newPatient);
});

export default router;
