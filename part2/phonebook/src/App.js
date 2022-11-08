import {useState} from 'react'
import {Form} from "./Form";
import {Search} from "./Search";
import {NumberList} from "./NumberList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNUmber] = useState("");
  const [search, setSearch] = useState("");

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
        <NumberList persons={persons} search={search}/>
      </div>
  )
}

export default App