import {useEffect, useState} from "react";
import axios from "axios";

export function Weather({country}) {
    const api_key = process.env.REACT_APP_API_KEY

    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {

        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2}&limit=1&appid=${api_key}`)
            .then(res => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&appid=${api_key}`)
                .then(response => {
                    console.log(response);
                    setWeatherData(response.data);
                    setLoading(false)
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
            <div> wind: {weatherData.wind.speed} m/s</div>

        </div>
    )

}