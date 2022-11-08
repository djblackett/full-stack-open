export function PhoneNumber({person}) {
    return <li key={person.name}>{person.name} {person.number}</li>;
}