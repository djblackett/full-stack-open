export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}



export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// Define special omit for unions
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property

// type EntryWithoutId = UnionOmit<Entry, 'id'>;
type OccupationalHealthcareEntryNoId = UnionOmit<OccupationalHealthcareEntry, 'id'>;
type HealthCheckEntryNoId = UnionOmit<HealthCheckEntry, 'id'>;
type HospitalEntryNoId = UnionOmit<HospitalEntry, 'id'>;

export type NewEntry =
  | OccupationalHealthcareEntryNoId
  | HealthCheckEntryNoId
  | HospitalEntryNoId;

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;


export type Entry =
  |  HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

