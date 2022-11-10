import {useEffect, useState} from 'react'
import {Form} from "./Form";
import {Search} from "./Search";
import {NumberList} from "./NumberList";
import phoneNumberService from './services/phoneNumbers';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);

  const deleteNumber = async (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      const res = await phoneNumberService.remove(id);
      setPersons(persons.filter(person => person.id !== id));
    }
  }

  const updateNumber = id => {

  }

  useEffect( () => {

    async function fetchPersons() {
      let response;
      try {
        response = await phoneNumberService.getAll();
        return response;
      } catch (error) {
        console.error(error);
      }
    }

   fetchPersons().then( response => {
     setPersons(response);
     setLoading(false);
   })

  },[])

  // checks for object equality by value instead of reference
  function containsObject(obj, list) {
    for (let x of list) {
      if (JSON.stringify(x) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }

    // handles both updating and adding a new number
    const addPhoneNumber = async (e) => {
      e.preventDefault();
      if (persons.find(person => person.name === newName)) {
        if (window.confirm(`${newName} is already in the phonebook. Replace their number with the new one?`)) {
          const person = persons.find(person => person.name === newName);
          await phoneNumberService.update(person.id, {...person, number: newNumber});
          setPersons(persons.filter(p => p.id !== person.id).concat({...person, number: newNumber}));
          setNewNumber("");
          setNewName("");
          console.log("updated")
        }
      }
      else {
        const res = await phoneNumberService.create({name: newName, number: newNumber});
        setPersons([...persons, res]);
        setNewName("");
        setNewNumber("");
      }
    }

    const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
    }

    const handleNameChange = (e) => {
      setNewName(e.target.value);
    }

    const handleSearchChange = (e) => {
    setSearch(e.target.value);
    }

  return (
      <div>
        <h2>Phonebook</h2>
        <Search value={search} onChange={handleSearchChange}/>
        <Form newName={newName} onChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}
              handleClick={addPhoneNumber}/>
        <h2>Numbers</h2>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
            <NumberList persons={persons} search={search} deleteNumber={deleteNumber} />
          }
      </div>
  );
}

export default App