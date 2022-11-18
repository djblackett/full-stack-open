import {PhoneNumber} from "./PhoneNumber";

export function NumberList({search, persons, deleteNumber}) {
    return (
    <ul style={{listStyle: "none", paddingLeft: 0}}>
        {persons && persons.filter(person => {
          if (search === "") {
            return true;
          } else {
            return person.name.toLowerCase().startsWith(search.toLowerCase());
          }
        })
            .map(person => <PhoneNumber key={person.id} person={person} deleteNumber={deleteNumber}/>)}
    </ul>
);
}

