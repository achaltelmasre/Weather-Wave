import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faCloud } from '@fortawesome/free-solid-svg-icons';

// Rest of your code

 import "./App.css"

 export default function App() {
    const [WeatherData, setWeatherData] = useState({});
    const [city, setCity] = useState("pune");
   
    async function loadWeatherData(){
       
       try{
       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}
            &appid=d6d775a49c54001a69fa189eb32d1213`)

       setWeatherData(response.data); 
       }
       catch(error){
         console.log(error)
       } 
    }
    useEffect(() => {
        loadWeatherData();
    },[])

     useEffect(()=>{
    loadWeatherData();

},[city])

//Date

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", {month:'long'});
  let day = d.toLocaleString("default",{weekday: 'long'});

//Time
let time = d.toLocaleTimeString([],{
    hour : '2-digit',
    minute : '2-digit',
    second : '2-digit'

});


    return (
        
       

        <div >
            <h1 className="text-center">⛅ Weather Wave ⛅  </h1>
             <div className=" search">
            <input type='text' value={city} onChange={(e) => {
            setCity(e.target.value);
          }} 
          placeholder="Search city"
        />
        </div>
       
        <div className="card">
                     
               <h1 className="city"> {WeatherData?.name}</h1>
               <p className="date-time ">
                  {day}, {month}, {date}, {year}
                  <br/>
                  {time}
               </p>
               <hr/>
                 <h1 className="cloud">⛅</h1>
             
               <h1 className="temperature ">{(WeatherData?.main?.temp - 273).toFixed(2)} °C</h1>
               <h1>Visibility: {WeatherData?.visibility} meters</h1>
        </div> 

        </div>
        
    )
 }