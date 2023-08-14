import express from "express";
import patientService from "../services/patientService";
import {NonSensitivePatientEntry, Patient} from "../types";
import toNewPatientEntry, {toNewEntry} from "../utils";

const router = express.Router();

router.get("/api/patients", (_req, res) => {
  const data: NonSensitivePatientEntry[] =
    patientService.getNonSensitiveEntries();
  res.json(data);
});

router.get("/api/patients/:id", (req, res) => {
  const id = req.params.id;
  const data: Patient | undefined = patientService.getEntries().find(patient => patient.id === id);
  res.json(data);
});

router.post("/api/patients", (req, res) => {
  const newPatient = toNewPatientEntry(req.body);
  const patient = patientService.addPatient(newPatient);
  res.json(patient);
});

router.post("/api/patients/:id/entries", (req, res) => {
  const newEntry = toNewEntry(req.body);
  const id = req.params.id;
  const entry = patientService.addEntry(newEntry, id);
  res.json(entry);
});

export default router;
