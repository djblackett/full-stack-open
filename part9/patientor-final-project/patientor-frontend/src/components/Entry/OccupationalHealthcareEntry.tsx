import {Entry} from "../../types";

const OccupationalHealthcareEntry = (props: {
    entry: Entry
}) => {

    if (props.entry.type === "OccupationalHealthcare") {
        return (
            <div>
                <p>Employer: {props.entry.employerName}</p>
                {props.entry.sickLeave && <p>Sick Leave: {props.entry.sickLeave?.startDate} to {props.entry.sickLeave?.endDate}</p>}
            </div>
        )
    } else {
        return null
    }
}

export default OccupationalHealthcareEntry;

// interface OccupationalHealthcareEntry extends BaseEntry {
//     type: "OccupationalHealthcare";
//     employerName: string;
//     sickLeave?: {
//         startDate: string,
//         endDate: string
//     }
// }