import React from 'react';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL,WEATHER_API_KEY } from './api';
import { useState } from 'react';

function App() {
    const [currentWeather, setCurrentWeather]= useState(null);
    const [forecast,setForecast] = useState(null);

    const handleOnSearchChange=(searchData)=>{
     const[lat,lon]= searchData.value.split(" ");

     const currentWeatherFetch=fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
      const forecastFetch=fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

      Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (reponse)=>{
        const weatherResponse=await reponse[0].json();
        const forecastResponse=await reponse[1].json();
        
        setCurrentWeather({city: searchData.label , ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch(console.log)
    }
    
    return (
    <div className="container">
       <Search onSearchChange={handleOnSearchChange}/>
       {currentWeather &&<CurrentWeather data={currentWeather}/>}
       {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
