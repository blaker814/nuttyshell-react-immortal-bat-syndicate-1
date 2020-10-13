import React from "react";
import "./Weather.css"


export const WeatherCard = ( {weather, temp} ) => {
    
    let date = weather.dt_txt
    console.log(weather,temp)
         return (
        <>
      <section className="Weather">
    <h3>Weather For {new Date(date).toLocaleDateString("en-US")}</h3>
      <div> {temp.temp} degrees </div>
      <div> {weather.pop * 100}% chance of rain </div><p></p>
      <div> {weather.found ? "" : "Here is the weather for today."} </div>
      </section>

      </>
    );
  };

