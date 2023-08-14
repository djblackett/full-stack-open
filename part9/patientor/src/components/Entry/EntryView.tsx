import {Diagnosis, Entry} from "../../types";
import EntryDetails from "./EntryDetails";
import {Box} from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


const chooseTypeIcon = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return <LocalHospitalIcon />
    case "OccupationalHealthcare":
      return <WorkIcon />
    case "HealthCheck":
      return <MedicalServicesIcon />
  }
}
const EntryView = (props: { entry: Entry, diagnoses?: Diagnosis[] }) => {
  console.log(props.entry);
  return (
    <Box border={1} borderRadius="12px" padding={2} marginTop={1} bgcolor={"cream"} boxShadow={3}>
      {chooseTypeIcon(props.entry)}
      <p>
        <b>{props.entry.date}</b>: {props.entry.description}
      </p>
      {props.entry.diagnosisCodes && <span>Diagnoses</span>}
        <ul>
            {props.entry.diagnosisCodes &&
                props.entry.diagnosisCodes.map((code: any) => (
                    <li key={code}>{code} {props.diagnoses && props.diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
                ))}
        </ul>
        <EntryDetails entry={props.entry}/>

        <p>Diagnosed by {props.entry.specialist}</p>
    </Box>
  );
};

export default EntryView;
