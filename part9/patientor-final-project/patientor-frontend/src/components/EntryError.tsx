import {Typography, Box} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

const EntryError = (props: {
    message: string
}) => {

    if (props.message === "") {
        return null;
    }

    return (
        <Box bgcolor={"lightsalmon"} border={1} borderRadius={"12px"} padding={3} display={"flex"}
             boxSizing={"border-box"}
             flexDirection={"row"}
             alignItems={"center"} maxHeight={"80px"}>
            <ErrorIcon color={"error"} display={"inline"}/>
            <Typography variant="h6" color={"error"} maxWidth={"90%"} margin={2}
                        display={"inline"}>{props.message}</Typography>
        </Box>
    )
}
export default EntryError;