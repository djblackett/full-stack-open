import {useEffect, useState} from 'react'
import {Form} from "./Form";
import {Search} from "./Search";
import {NumberList} from "./NumberList";
import axios from "axios";

const baseUrl = "http://localhost:3001"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNUmber] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);



  useEffect( () => {

    async function fetchPersons() {
      let response;
      try {
        response = await axios.get(`${baseUrl}/persons`);
        return response;
      } catch (error) {
        console.error(error);
      }
    }

   fetchPersons().then( response => {
     setPersons(response.data);
     setLoading(false);
   })

  },[])

  function containsObject(obj, list) {
    for (let x of list) {
      if (JSON.stringify(x) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }


    const handleClick = (e) => {
      e.preventDefault();
      if (containsObject({name: newName}, persons)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        setPersons([...persons, {name: newName, number: newNumber}])
        setNewName("");
        setNewNUmber("");
      }
    }

    const handleNumberChange = (e) => {
    setNewNUmber(e.target.value);
    }

    const handleChange = (e) => {
      setNewName(e.target.value);
    }

    const handleSearchChange = (e) => {
    setSearch(e.target.value);
    }

  return (
      <div>
        <h2>Phonebook</h2>
        <Search value={search} onChange={handleSearchChange}/>
        <Form newName={newName} onChange={handleChange} newNumber={newNumber} handleNumberChange={handleNumberChange}
              handleClick={handleClick}/>
        <h2>Numbers</h2>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
            <NumberList persons={persons} search={search} />
          }
      </div>
  );
}

export default App