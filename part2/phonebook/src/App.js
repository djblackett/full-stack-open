import {useEffect, useState} from 'react'
import {Form} from "./Form";
import {Search} from "./Search";
import {NumberList} from "./NumberList";
import phoneNumberService from './services/phoneNumbers';
import {ErrorNotification} from "./ErrorNotification";
import {SuccessNotification} from "./SuccessNotification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [messageColor, setMessageColor] = useState("green");

  const deleteNumber = async (id) => {
    const person = persons.find(person => person.id === id);
    try {
      if (window.confirm(`Delete ${person.name}?`)) {
        await phoneNumberService.remove(id);
        setPersons(persons.filter(person => person.id !== id));
      }
    } catch (error) {
      setErrorMessage(`${person.name} was already removed from the server`);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      setPersons(persons.filter(p => p.id !== person.id));
    }
  }

  const updateNumber = async () => {
    if (window.confirm(`${newName} is already in the phonebook. Replace their number with the new one?`)) {
      const person = persons.find(person => person.name === newName);
      phoneNumberService.update(person.id, {...person, number: newNumber}).then(result => {
        setPersons(persons.filter(p => p.id !== person.id).concat({...person, number: newNumber}));
        console.log("did i get here?")
        setNewNumber("");
        setNewName("");
        console.log("updated")
      })
          .catch(error => {
            setMessageColor("red");
            setSuccessMessage(error.response.data.error);
            setTimeout(() => {
              setSuccessMessage(null);
              setMessageColor("green");
            }, 5000);
          })
    }
  }

  useEffect(() => {

    async function fetchPersons() {
      let response;
      try {
        response = await phoneNumberService.getAll();
        return response;
      } catch (error) {
        console.error(error);
      }
    }

    fetchPersons().then(response => {
      setPersons(response);
      setLoading(false);
    })
  }, [])


  // handles both updating and adding a new number
  const addPhoneNumber = async (e) => {
    e.preventDefault();
    if (persons.find(person => person.name === newName)) {
      await updateNumber();
    } else {

      phoneNumberService.create({name: newName, number: newNumber}).then((result) => {
        setPersons([...persons, result]);

        setSuccessMessage(`Added ${newName}`);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
          .catch(error => {
            setMessageColor("red");
            setSuccessMessage(error.response.data.error);
            setTimeout(() => {
              setSuccessMessage(null);
              setMessageColor("green");
            }, 5000);
          })
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
        <SuccessNotification message={successMessage} messageColor={messageColor}/>
        <Search value={search} onChange={handleSearchChange}/>
        <Form newName={newName} onChange={handleNameChange} newNumber={newNumber}
              handleNumberChange={handleNumberChange}
              handleClick={addPhoneNumber}/>
        <h2>Numbers</h2>
        <ErrorNotification message={errorMessage}/>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
            <NumberList persons={persons} search={search} deleteNumber={deleteNumber}/>
        }
      </div>
  );
}

export default App