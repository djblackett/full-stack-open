import EntryError from "./EntryError";
import {
    Box,
    Button,
    ButtonGroup,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React from "react";
import {ButtonState} from "../types";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";


const EntryFormView = (props: {
    errorMessage: string,
    submit: any,
    buttonState: ButtonState,
    setButtonState: React.Dispatch<React.SetStateAction<ButtonState>>,
    datePicker: Dayjs | null,
    setDatePicker: React.Dispatch<React.SetStateAction<Dayjs | null>>,
    dateDischarge: Dayjs | null,
    setDateDischarge: React.Dispatch<React.SetStateAction<Dayjs | null>>,
    diagnosisCodes?: string[],
    selectedCodes?: string[],
    setSelectedCodes: React.Dispatch<React.SetStateAction<Array<string>>>,
    sickLeaveStart: Dayjs | null,
    sickLeaveEnd: Dayjs | null,
    setSickLeaveStart: React.Dispatch<React.SetStateAction<Dayjs | null>>,
    setSickLeaveEnd: React.Dispatch<React.SetStateAction<Dayjs | null>>

}) => {

    const healthCheckComponent = () => {
        return (
            <Box marginBottom={2}>
                <TextField id="healthCheckRating" label="Health check rating" variant="outlined"
                           margin={"dense"} required inputProps={{pattern: "[0-3]"}}
                           helperText={"Please enter a number fom 0 to 3"}/>
            </Box>
        )
    }
    const dischargeComponent = () => {
        return (
            <Box marginTop={1} marginBottom={2}>
                <InputLabel id="discharge">Discharge: </InputLabel>
                <DatePicker defaultValue={dayjs()} value={props.dateDischarge} onChange={props.setDateDischarge}/>
                <TextField id="criteria" label="Criteria" required/>
            </Box>
        )
    }

    const occupationalComponent = () => {
        return (
            <Box marginTop={2} marginBottom={2}>
                <TextField id="employerName" label="Employer name" required/>
                <Box marginTop={2}>
                    <InputLabel>Sick Leave: </InputLabel>
                    <DatePicker defaultValue={dayjs()} value={props.sickLeaveStart} onChange={props.setSickLeaveStart}/>
                    <DatePicker defaultValue={dayjs()} value={props.sickLeaveEnd} onChange={props.setSickLeaveEnd}/>
                </Box>
            </Box>
        )
    }

    const onHealthCheckClick = () => {
        props.setButtonState({
            healthcheck: true,
            hospital: false,
            occupational: false
        })
    }

    const onHospitalClick = () => {
        props.setButtonState({
            healthcheck: false,
            hospital: true,
            occupational: false
        })
    }

    const onOccupationalClick = () => {
        props.setButtonState({
            healthcheck: false,
            hospital: false,
            occupational: true
        })
    }

    const handleCodeChange = (event: SelectChangeEvent<Array<string>>) => {
        const {
            target: {value},
        } = event;

        props.setSelectedCodes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    return (
        <>
            <EntryError message={props.errorMessage}/>
            <form id="entryForm" onSubmit={(e) => props.submit(e)}>
                <Box display={"flex"} flexDirection={"column"}>
                    <ButtonGroup variant={"outlined"}>
                        <Button variant={props.buttonState.healthcheck ? "contained" : "outlined"}
                                onClick={onHealthCheckClick}>Healthcheck</Button>
                        <Button variant={props.buttonState.hospital ? "contained" : "outlined"}
                                onClick={onHospitalClick}>Hospital</Button>
                        <Button
                            variant={props.buttonState.occupational ? "contained" : "outlined"}
                            onClick={onOccupationalClick}>OccupationalHealthcare</Button>
                    </ButtonGroup>
                    <TextField id="description" label="Description" variant="outlined" margin={"dense"} required/>
                    <DatePicker defaultValue={dayjs()} value={props.datePicker} onChange={props.setDatePicker}/>
                    <TextField id="specialist" label="Specialist" variant="outlined" margin={"dense"} required/>
                    <InputLabel id={"codeSelectorLabel"}>Diagnosis code</InputLabel>
                    <Select
                        multiple
                        labelId={"codeSelectorLabel"}
                        id={"codeSelector"}
                        value={props.selectedCodes}
                        input={<OutlinedInput label="Code"/>}
                        onChange={handleCodeChange}>
                        {props.diagnosisCodes?.map(code => <MenuItem
                            key={code}
                            value={code}
                        >
                            {code}
                        </MenuItem>)}
                    </Select>
                    {props.buttonState.healthcheck && healthCheckComponent()}
                    {props.buttonState.hospital && dischargeComponent()}
                    {props.buttonState.occupational && occupationalComponent()}
                    <Box maxWidth={"50%"}>
                        <Button type="submit" variant={"contained"}>Submit</Button>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default EntryFormView;