import {useEffect, useState} from "react";
import axios from 'axios';

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


function SingleCountry({country, setOpen, isPartOfList}) {
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
            <img alt={`flag of ${country.name.common}`} src={country.flags[1]} />
            <h2>Weather in {country.capital}</h2>
            <Weather country={country}/>
            {isPartOfList && <><br/><button onClick={() => setOpen(false)}>hide</button></>}
        </div>
    )
}

function Countries({filteredCountries}) {

    return (
        <ul style={{listStyle: "none", marginLeft: 0}}>
            {filteredCountries.map((country) => {
                return <MinimizedCountry key={country.name.common} country={country}/>
            })}
        </ul>
    )
}

function MinimizedCountry({country}) {

    const [isOpen, setOpen] = useState(false);

    if (!isOpen) {
        return <li key={country.name.common}>{country.name.common} <button onClick={() => setOpen(!isOpen)}>show</button></li>
    }
    return <SingleCountry country={country} setOpen={setOpen} isPartOfList={true} isOpen={isOpen} />
}

function Weather({country}) {
    const api_key = process.env.REACT_APP_API_KEY

    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {

        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2}&limit=1&appid=${api_key}`)
                .then(res => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&appid=${api_key}`)
                .then(response => {
                    console.log(response);
                    setWeatherData(response.data);
                    setLoading(false)})
                        .then(res => {
                            const icon = res.data.weather[0].icon;
                            // axios.get(`http://openweathermap.org/img/wn/${icon}@2x.png`);
                        })
                )
    }, []);

    if (isLoading) {
        return <p>Loading weather for {country.capital}</p>
    }

    return (
        <div>
           <div> temperature: {(weatherData.main.temp - 273.15).toFixed(1)} Celsius</div>
            <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
            <div> {weatherData.wind.speed} m/s</div>

        </div>
    )

}