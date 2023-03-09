import patientData from "../data/patients";
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import { v1 as uuid } from "uuid";
const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientEntry: NewPatientEntry) => {
  const patient = { id: uuid(), ...patientEntry };
  patients.push(patient);
  console.log("patient added");
  return patient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
};
