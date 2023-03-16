import { Entry } from "../types";

const EntryView = (props: { entry: Entry }) => {
  console.log(props.entry);
  return (
    <div>
      <p>
        {props.entry.date} {props.entry.description}
      </p>
      <ul>
        {props.entry.diagnosisCodes &&
          props.entry.diagnosisCodes.map((diagnosis) => (
            <li key={diagnosis}>{diagnosis}</li>
          ))}
      </ul>
    </div>
  );
};

export default EntryView;
