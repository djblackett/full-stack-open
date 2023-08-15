import {Entry} from "../../types";
import {Box, Typography} from "@mui/material";

const HospitalEntry = (props: {
    entry: Entry
}) => {
    if (props.entry.type === "Hospital") {
        return (
            <Box>
                <Typography margin={0}>Discharged on: {props.entry.discharge.date}</Typography>
                <Typography margin={0}>Reason: {props.entry.discharge.criteria}</Typography>
            </Box>
        )
    } else {
        return null;
    }
}

export default HospitalEntry;