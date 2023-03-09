import diagnosesData from "../data/diagnoses";
import { DiagnosisEntry } from "../types";

const diagnoses: DiagnosisEntry[] = diagnosesData;
const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
