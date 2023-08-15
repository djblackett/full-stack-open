import {Diagnosis, Entry, Gender, HealthCheckRating, NewEntry, NewPatientEntry} from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
      "name" in object &&
      "dateOfBirth" in object &&
      "gender" in object &&
      "occupation" in object &&
      "ssn" in object &&
      "entries" in object
  ) {

    if (object.entries instanceof Array && isEntriesValid(object.entries)) {

      return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),

        entries: object.entries as Entry[]
      };
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown) => {
  return typeof text === "number" || text instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

interface TypeKeyEntry {
  type: string,
  [key: string]: any
}

const validateEntryHasType = (obj: any): obj is TypeKeyEntry => {
  return "type" in obj;
};
const isValidEntry = (entry: unknown) => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Missing entry");
  }

  if (validateEntryHasType(entry)) {
    if (["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(entry.type)) {
      return true;
    }
  }
  return false;
};

const isEntriesValid = (entries: unknown[]) => {
  for (const entry of entries) {
    if (!isValidEntry(entry)) {
      return false;
    }
  }
  return true;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (entry: unknown): NewEntry => {

  if (!entry || typeof entry !== "object") {
    throw new Error("Missing entry");
  }

  if (
      "type" in entry &&
      "description" in entry &&
      "date" in entry &&
      "specialist" in entry
  ) {

    let newEntry: TypeKeyEntry = {
      type: parseType(entry.type),
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),

    };


    if ("diagnosisCodes" in entry) {
      newEntry = Object.defineProperty(newEntry, "diagnosisCodes", {value: parseDiagnosisCodes(entry.diagnosisCodes)});
    }

    switch (entry.type) {
      case "Hospital":
        if (
            "discharge" in entry
        ) {
          newEntry.discharge = parseDischarge(entry.discharge);
          console.log(newEntry);
          return newEntry as NewEntry;
        }
        break;
      case "HealthCheck":
        if ("healthCheckRating" in entry) {
          newEntry.healthCheckRating = parseHealthCheckRating(Number(entry.healthCheckRating));
          console.log(newEntry);
          return newEntry as NewEntry;
        }
        break;
      case "OccupationalHealthcare":
          if ("sickLeave" in entry ) {
            newEntry.sickLeave = parseSickLeave(entry.sickLeave);
          }
        if ("employerName" in entry && isString(entry.employerName)) {
          newEntry.employerName = entry.employerName;
          console.log(newEntry);
          return newEntry as NewEntry;
        }
        break;
    }
  }
  throw new Error("Incorrect or missing required data fields");
};

const parseDescription = (description: unknown) => {
  if (!description || !isString(description)) {
    throw new Error("Invalid or missing description");
  }
  return description;
};

const parseHealthCheckRating = (rating: unknown) => {
    if (!rating) {
      throw new Error("Missing health check rating");
    }

  if (!isNumber(rating)) {
    throw new Error(`Healthcheck rating should be a number`);
  }

    switch (rating) {
      case 0:
        return HealthCheckRating.Healthy;
      case 1:
        return HealthCheckRating.LowRisk;
      case 2:
        return HealthCheckRating.HighRisk;
      case 3:
        return HealthCheckRating.CriticalRisk;
      default:
        throw new Error(`Health check rating must be between 0 and 3. Incorrect value: ${rating}`);
    }
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Invalid or missing discharge object");
  }
  if (
      "date" in discharge &&
      "criteria" in discharge
  ) {
    return discharge;
  }
    throw new Error("Invalid discharge object");
};

const parseSickLeave = (sickLeave: unknown) => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Invalid or missing sickLeave object");
  }
  if (
      "startDate" in sickLeave &&
      "endDate" in sickLeave &&
      isString(sickLeave.startDate) &&
      isString(sickLeave.endDate)
  ) {
    return sickLeave;
  }
  throw new Error("Invalid sickLeave object");
};

const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Invalid or missing specialist");
  }
  return specialist;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseType = (type: unknown) => {
  if (!type || !isString(type) || !["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(type)) {
    throw new Error("Invalid or missing entry type");
  }
  return type;
};


export default toNewPatientEntry;
