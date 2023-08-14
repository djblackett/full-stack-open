import {Entry} from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";


const EntryDetails = (props: {
    entry: Entry
}) => {
        switch (props.entry.type) {
            case "HealthCheck":
                return <HealthCheckEntry entry={props.entry}/>
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntry entry={props.entry}/>
            case "Hospital":
                return <HospitalEntry entry={props.entry}/>
            default:
                return null
    }
}

export default EntryDetails;