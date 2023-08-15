import {Box, Button, ButtonGroup, TextField} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";
import {ButtonState, Entry, NewEntry, Patient} from "../types";
import EntryError from "./EntryError";
import EntryFormView from "./EntryFormView";
import dayjs, {Dayjs} from "dayjs";

const EntryForm = (props: {
    patientId?: string,
    patient: Patient,
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>,
    diagnosisCodes?: string[]
}) => {

    const [buttonState, setButtonState] = useState<ButtonState>({
        healthcheck: true,
        hospital: false,
        occupational: false
    });

    const [selectedCodes, setSelectedCodes] = useState<Array<string>>([]);
    const [datePicker, setDatePicker] = useState<Dayjs | null>(dayjs());
    const [dateDischarge, setDateDischarge] = useState<Dayjs | null>(dayjs());
    const [sickLeaveStart, setSickLeaveStart] = useState<Dayjs | null>(dayjs());
    const [sickLeaveEnd, setSickLeaveEnd] = useState<Dayjs | null>(dayjs());
    const [errorMessage, setErrorMessage] = useState("");

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const description: HTMLInputElement | null = document.getElementById("description") as HTMLInputElement;
        const specialist: HTMLInputElement = document.getElementById("specialist") as HTMLInputElement;
        const healthCheckRating = document.getElementById("healthCheckRating") as HTMLInputElement;
        const criteria = document.getElementById("criteria") as HTMLInputElement;
        const employerName = document.getElementById("employerName") as HTMLInputElement;

        const getEntryType = (state: ButtonState) => {
            if (state.occupational) {
                return "OccupationalHealthcare";
            } else if (state.hospital) {
                return "Hospital";
            } else if (state.healthcheck) {
                return "HealthCheck";
            }
            throw new Error("Missing type")
        }

        const newEntry: NewEntry = {
            description: description?.value,
            date: datePicker?.toISOString().substring(0, 10) || "",
            specialist: specialist?.value,
            diagnosisCodes: selectedCodes,
            healthCheckRating: Number(healthCheckRating?.value),
            type: getEntryType(buttonState),
            discharge: {
                date: dateDischarge?.toISOString().substring(0, 10) || "",
                criteria: criteria?.value
            },
            employerName: employerName?.value,
            sickLeave: {
                startDate: sickLeaveStart?.toISOString().substring(0, 10) || "",
                endDate: sickLeaveEnd?.toISOString().substring(0, 10) || ""
            }
        }

        const response = await axios.post(`http://localhost:3000/api/patients/${props.patientId}/entries`, newEntry).catch(error => {
            setErrorMessage(error.response.data);
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        });

        if (response?.data) {
            console.log(response.data)
            if (response.status === 200) {
                const data = response.data as Entry;
                props.setPatient({
                    ...props.patient, entries: [
                        ...props.patient.entries, data
                    ]
                });
                resetForm();
            } else {
                setErrorMessage(response.data)
            }
        }
    }

    const resetForm = () => {
        const form = document.getElementById("entryForm") as HTMLFormElement;
        form.reset();
        setSelectedCodes([]);
        setDateDischarge(dayjs());
        setSickLeaveEnd(dayjs());
        setSickLeaveStart(dayjs);
        setDatePicker(dayjs());
    }

    return <EntryFormView errorMessage={errorMessage} submit={submit} buttonState={buttonState}
                          setButtonState={setButtonState} datePicker={datePicker} setDatePicker={setDatePicker}
                          dateDischarge={dateDischarge} setDateDischarge={setDateDischarge}
                          diagnosisCodes={props.diagnosisCodes} selectedCodes={selectedCodes}
                          setSelectedCodes={setSelectedCodes} sickLeaveStart={sickLeaveStart}
                          sickLeaveEnd={sickLeaveEnd}
                          setSickLeaveStart={setSickLeaveStart} setSickLeaveEnd={setSickLeaveEnd}
    />
}

export default EntryForm;


