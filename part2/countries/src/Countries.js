import {MinimizedCountry} from "./MinimizedCountry";

export function Countries({filteredCountries}) {

    return (
        <ul style={{listStyle: "none", marginLeft: 0}}>
            {filteredCountries.map((country) => {
                return <MinimizedCountry key={country.name.common} country={country}/>
            })}
        </ul>
    )
}