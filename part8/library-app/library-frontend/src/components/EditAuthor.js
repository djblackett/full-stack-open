import { Notify } from "../App";
import Select from "react-select";

const EditAuthor = ({
  errorMessage,
  submitAuthorChanges,
  selectedOption,
  setSelectedOption,
  options,
  born,
  setBorn,
  loggedIn,
}) => {
  if (!loggedIn) {
    return null;
  }
  return (
    <>
      <h3>Set Birthdate</h3>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submitAuthorChanges}>

        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <br />
        <label>Born: </label>
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <br />
        <button type="submit">Update Author</button>
      </form>
    </>
  );
};

export default EditAuthor;
