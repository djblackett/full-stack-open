import {Entry} from "../../types";
import {Box} from "@mui/material";

const HospitalEntry = (props: {
    entry: Entry
}) => {
        if (props.entry.type === "Hospital") {

            return (
            <Box>
                <p>Discharged on: {props.entry.discharge.date}</p>
                <p>Reason: {props.entry.discharge.criteria}</p>
            </Box>
            )
        } else {
            return null;
        }
}

export default HospitalEntry;