import {useEffect, useState} from "react";
import axios from 'axios';
import {SingleCountry} from "./SingleCountry";
import {Countries} from "./Countries";

function App() {

    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [result, setResult] = useState(<div />);

    const onChange = (e) => setSearch(e.target.value);


    useEffect(() => {
        axios.get("https://restcountries.com/v3/all").then(r => {
            setCountries(r.data);
            setFilteredCountries(r.data);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        if (countries) {
            setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search]);

    useEffect(() => {
        if (filteredCountries.length > 10) {
            setResult(<p>Too many matches, specify another filter</p>);
        } else if (filteredCountries.length > 1) {
            setResult(<Countries filteredCountries={filteredCountries} />)
        } else if (filteredCountries.length === 1) {
            const country = filteredCountries[0];
            console.log(country.name.common);
            setResult(<SingleCountry country={country}/>)
        }
    }, [filteredCountries, search]);


  return (
    <div>
      <div>find countries <input value={search} onChange={onChange}/></div>
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && result}
        </div>
    </div>
  );
}

export default App;


