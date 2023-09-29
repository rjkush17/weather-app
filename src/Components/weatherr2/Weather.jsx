import React, { useEffect, useState } from 'react'
import axios from "axios";


function Weather() {
    const [data, setData] = useState('');
    const [city, setCity] = useState('indore')
    const [inputValue, setInputValue] = useState("")
    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3e82c676c179affedeab95479ef2100`)
        .then((response)=>
        {
            setData(response.data.main)
            console.log(response.data.main)
        })
    },[city])
        

    const handleChange = (e) =>{
       setInputValue(e.target.value)
    }
    const handleClick = () => {
      setCity(inputValue)
      console.log(inputValue)
    }
  return (
    <>
    <div>
        {data.temp}
        <input type='text' onChange={handleChange}/>
        <button onClick={handleClick} >Search</button>
    </div>
    </>
  )
  
}

export default Weather