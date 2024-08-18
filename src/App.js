
import React, { useState } from "react";
import { useEffect } from 'react';

function App() {
  const [city,setCity]= useState("Hyderabad");
  const [weatherData,setWeatherData]= useState(null);
  const [error, setError] = useState(null);
  const months=[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate =new Date();
  const month=months[currentDate.getMonth()];
  const day=currentDate.getDate();
  const year=currentDate.getFullYear();

  const formattedDate=`${month} ${day},${year}`;

  

  const API_KEY="d62d8d39ac22613dc3b073f150504af5";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data)
      // if (response.ok) {
      setWeatherData(data);
      // setError(null);
      // } else {
      //   setError(data.message);
      //   setWeatherData(null);
      // }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // setError("Error fetching weather data. Please try again later.");
      // setWeatherData(null);
    }
  };
  useEffect(()=>{
    fetchWeatherData();
  },[]);

  const handleInputChange= (event) =>{
    console.log(event.target.value);
    setCity(event.target.value);
  }
  const handleSubmit= (event) => {
    event.preventDefault();
    fetchWeatherData();
  }
  const getWeatherIcon=(weatherCondition)=>{
    switch(weatherCondition){
      case "Clear":
        return "/sun.png";
      case "Clouds":
        return "/sky.png";
      case "Rain":
        return "/thunder.png";
      case "Haze":
        return "/sky.png";
      case "Thunderstorm":
        return "/thunder.png";
      case "Snow":
        return "/snowflake.png";
      default:
        return "/sky.png";
    }
  } 

  return (
    <div className="App">
      <div className="container">
        {weatherData && (
        <>
          <h1 className="container_date">{formattedDate}</h1>
          <div className="weather_data">
            <h2 className="container_city">{weatherData.name}</h2>
            <img 
            className="container_img" 
            src={getWeatherIcon(weatherData.weather[0].main)}
            width="160px" 
            alt="Weather" />
            <h2 className="container_degree">{weatherData.main.temp}</h2>
            <p className="weather_con">{weatherData.weather[0].main}</p>
            <p className="humidity">Humidity:{weatherData.main.humidity}</p>
            <form className='form' onSubmit={handleSubmit}>
              <input type="text" id="cityInput" placeholder='Enter city name' onChange={handleInputChange} />
              <button type='submit' id="searchButton">Get</button>
            </form>
          </div>
       
          </>
        )}
        
      </div>
    </div>
    
  );
}

export default App;
