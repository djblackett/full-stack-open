import {Box, Button, ButtonGroup, TextField} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";
import {Entry, Patient} from "../types";
import EntryError from "./EntryError";


const EntryForm = (props: {
    patientId?: string,
    patient: Patient,
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}) => {

    const [errorMessage, setErrorMessage] = useState("");
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const description: HTMLInputElement | null = document.getElementById("description") as HTMLInputElement;
        const date = document.getElementById("date") as HTMLInputElement;
        const specialist: HTMLInputElement = document.getElementById("specialist") as HTMLInputElement;
        const diagnosisCodes = document.getElementById("diagnosisCodes") as HTMLInputElement;
        const healthCheckRating = document.getElementById("healthCheckRating") as HTMLInputElement;

        console.log(specialist)
        const newEntry = {
            description: description?.value,
            date: date?.value,
            specialist: specialist?.value,
            diagnosisCodes: diagnosisCodes?.value,
            healthCheckRating: Number(healthCheckRating?.value),
            type: "HealthCheck"
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
            } else {
                setErrorMessage(response.data)
            }
        }
    }

    return (
        <>
            <EntryError message={errorMessage}/>
            <form onSubmit={(e) => submit(e)}>
                <Box display={"flex"} flexDirection={"column"}>
                    <ButtonGroup
                        variant={"outlined"}><Button>Healthcheck</Button><Button>Hospital</Button><Button>OccupationalHealthcare</Button></ButtonGroup>
                    <TextField id="description" label="Description" variant="outlined" margin={"dense"}/>
                    <TextField id="date" label="Date" variant="outlined" margin={"dense"}/>
                    <TextField id="specialist" label="Specialist" variant="outlined" margin={"dense"}/>
                    <TextField id="diagnosisCodes" label="Dianosis codes (optional)" variant="outlined"
                               margin={"dense"}/>
                    <TextField id="healthCheckRating" label="Health check rating" variant="outlined" margin={"dense"}/>
                    <Button type="submit">Submit</Button>
                </Box>
            </form>
        </>
    )
}

export default EntryForm;