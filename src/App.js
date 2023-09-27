import React, { useEffect, useState } from "react";
import axios from 'axios';


// Rest of your code
import cloudy from "./img/cloudy.gif";
import humidity from "./img/humidity.gif";
import pressure from "./img/pressure.gif";
import visibility from "./img/visibility.gif";
import wind from "./img/wind.gif";

 import "./App.css"

 export default function App() {

    const [weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState("pune");
    const [weatherDescription, setWeatherDescription] = useState("");
   
    async function loadWeatherData(){
       
       try{
           const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q= ${city}
            &appid=d6d775a49c54001a69fa189eb32d1213`)

       setWeatherData(response.data); 
       }
       catch(error){
         console.log(error);
       } 
     }

    useEffect(() => {
        loadWeatherData();
      }, [])

    useEffect(()=>{
    loadWeatherData();
     }, [city])

     useEffect(() => {
      setWeatherDescription(`${weatherData?.weather?.[0]?.main}
        (${weatherData?.weather?.[0]?.description})`)
     })

//Date

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", {month:'short'});
  let day = d.toLocaleString("default",{weekday: 'short'});

//Time

let time = d.toLocaleTimeString([],{
    hour : '2-digit',
    minute : '2-digit',
    // second : '2-digit'

});

//emoji



    return (
        <div >
            <h1 className="text-center">⛅ Weather Wave ⛅ </h1>
             <div className=" search">
             <p className="date-time ">
                  {day}, {month}, {date}, {year}
                  <br/>
                  {time}
               </p>
            <input type='text' value={city} onChange={(e) => {
            setCity(e.target.value);
          }} 
            placeholder="Search location...."
        />
      
        </div>
       
        <div className="card">
                     
               <h1 className="city"> {weatherData?.name}</h1>
                
               <p className="description"> {weatherDescription}</p>
                
                 {<img  src={cloudy} className="img"/> }

               <h1 className="temperature ">{(weatherData?.main?.temp - 273).toFixed(2)} °C</h1>
   
            <div className="box">
               <p className="img2"><img src={visibility} /> {weatherData?.visibility} meters</p>
               <p className="img2"><img src={wind}/> {weatherData?.wind?.speed} km/h</p>
            </div>
            <div className="box">
               <p className="img2"><img src={humidity}/> {weatherData?.main?.humidity} F</p>
                <p className="img2"><img src={pressure} /> {weatherData?.main?.pressure} pa</p>
             </div>
             <br />

        </div> 

        <br/><br/>
        </div>
        
        
    )
 }