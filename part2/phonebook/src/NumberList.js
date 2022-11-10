import {PhoneNumber} from "./PhoneNumber";

export function NumberList({search, persons}) {
    return (
    <ul style={{listStyle: "none", paddingLeft: 0}}>
        {persons.filter(person => {
          if (search === "") {
            return true;
          } else {
            return person.name.toLowerCase().startsWith(search.toLowerCase());
          }
        })
            .map(person => <PhoneNumber key={person.name} person={person} />)}
    </ul>
);
}

