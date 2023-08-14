import {Box, Button, TextField} from "@mui/material";
import axios from "axios";
import React from "react";
import {Entry, Patient} from "../types";

const EntryForm = (props: {patientId?: string, patient: Patient, setPatient: React.Dispatch<React.SetStateAction<Patient | null>>}) => {

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const description: HTMLInputElement | null = document.getElementById("description") as HTMLInputElement;
        const date = document.getElementById("date") as HTMLInputElement;
        const specialist = document.getElementById("specialist") as HTMLInputElement;
        const diagnosisCodes = document.getElementById("diagnosisCodes") as HTMLInputElement;
        const healthCheckRating = document.getElementById("healthCheckRating") as HTMLInputElement;

        const newEntry = {
          description: description?.value,
            date:date?.value,
            specialist: specialist?.value,
            diagnosisCodes: diagnosisCodes?.value,
            healthCheckRating: healthCheckRating?.value,
            type: "HealthCheck"
        }

        const json = JSON.stringify(newEntry);
        const response = await axios.post(`http://localhost:3000/api/patients/${props.patientId}/entries`, newEntry)
        if (response) {
            console.log(response.data)
            const data = response.data as Entry;
            props.setPatient({
                ...props.patient, entries: [
                    ...props.patient.entries, data
                ]
            })
        }
    }

    return (
        <form onSubmit={(e) => submit(e)}>
            <Box display={"flex"} flexDirection={"column"}>
        <TextField id="description" label="Description" variant="outlined" margin={"dense"}/>
        <TextField id="date" label="Date" variant="outlined" margin={"dense"}/>
        <TextField id="specialist" label="Specialist" variant="outlined" margin={"dense"}/>
        <TextField id="diagnosisCodes" label="Dianosis codes" variant="outlined" margin={"dense"}/>
        <TextField id="healthCheckRating" label="Health check rating" variant="outlined" margin={"dense"}/>
            <Button type="submit" >Submit</Button>
            </Box>
            </form>
    )
}

export default EntryForm;