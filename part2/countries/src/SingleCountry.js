import {Weather} from "./Weather";


export function SingleCountry({country, setOpen, isPartOfList}) {
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>
                capital: {country.capital} <br/>
                area: {country.area}
            </p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(name => <li key={name}>{name}</li>)}
            </ul>
            <img alt={`flag of ${country.name.common}`} src={country.flags[1]}/>
            <h2>Weather in {country.capital}</h2>
            <Weather country={country}/>
            {isPartOfList && <><br/>
                <button onClick={() => setOpen(false)}>hide</button>
            </>}
        </div>
    )
}