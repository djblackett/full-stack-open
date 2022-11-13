import {useState} from "react";
import {SingleCountry} from "./SingleCountry";

export function MinimizedCountry({country}) {

    const [isOpen, setOpen] = useState(false);

    if (!isOpen) {
        return <li key={country.name.common}>{country.name.common}
            <button onClick={() => setOpen(!isOpen)}>show</button>
        </li>
    }
    return <SingleCountry country={country} setOpen={setOpen} isPartOfList={true} isOpen={isOpen}/>
}