import {Diagnosis, Patient} from "../types";
import EntryView from "./Entry/EntryView";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import patients from "../services/patients";
import {Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody, List, ListItem} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryForm from "./EntryForm";

const PatientView = (props: {
    diagnoses?: Diagnosis[],
    diagnosisCodes?: string[]
}) => {
    const {id} = useParams();
    const [patient, setPatient] = useState<Patient | null>(null)

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                const patient = await patients.getById(id)
                setPatient(patient)
            }
        }
        void fetchPatient()
    }, [])

    if (patient) {
        return (
            <Box>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography variant="h3" marginTop={5}>{patient.name}</Typography>
                    {patient.gender == "male" ? <MaleIcon sx={{marginLeft: "20px", marginTop: "40px"}}/> :
                        <FemaleIcon sx={{marginLeft: "20px", marginTop: "40px"}}/>}
                </div>
                <List>
                    <ListItem>Occupation: {patient.occupation}</ListItem>

                    <ListItem>SSH: {patient.ssn}</ListItem>
                    <ListItem>Date of Birth: {patient.dateOfBirth}</ListItem>
                </List>
                <EntryForm patientId={id} patient={patient} setPatient={setPatient}
                           diagnosisCodes={props.diagnosisCodes}/>
                <Typography variant="h5" marginTop={3}>Entries:</Typography>
                <List>{patient.entries && patient.entries.map(entry => <ListItem key={entry.id}><EntryView entry={entry}
                                                                                                           diagnoses={props.diagnoses}/></ListItem>)}</List>
            </Box>
        )
    } else {
        return null
    }
}
export default PatientView;