import { useState } from "react";
import {useMutation, useQuery} from "@apollo/client";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";
import { Notify } from "../App";
import Select from "react-select";
import EditAuthor from "./EditAuthor";

const Authors = ({ show, loggedIn }) => {
  const authors = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      setErrorMessage(messages);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    },
  });
  const submitAuthorChanges = async (e) => {
    e.preventDefault();
    if (selectedOption) {
      await editAuthor({
        variables: { name: selectedOption.value, setBornTo: Number(born) },
      });
      console.log("edit author");
      setBorn("");
    }
  };

  if (!show) {
    return null;
  }
  if (authors.loading) {
    return <div>loading...</div>;
  }

  const authorsArray = authors.data.allAuthors;

  const options = authorsArray.map((author) => {
    return { value: author.name, label: author.name };
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorsArray.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor
        loggedIn={loggedIn}
        errorMessage={errorMessage}
        born={born}
        setBorn={setBorn}
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        submitAuthorChanges={submitAuthorChanges}
      />
    </div>
  );
};

export default Authors;
