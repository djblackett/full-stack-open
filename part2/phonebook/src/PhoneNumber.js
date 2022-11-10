import phoneNumberService from './services/phoneNumbers.js';

export function PhoneNumber({person, deleteNumber}) {


    return (
        <>
        <li key={person.name}>{person.name} {person.number}</li>
        <button onClick={() => deleteNumber(person.id)}>delete</button>
        </>
            )
}