import { useState, useRef } from "react";
import axios from "axios";
import WeatherCard from "../weatherWidget/weatherWidget";
import "./home.css"

const Home = () => {
  // not recommended
  // const [cityName, setCityName] = useState("");

  const [weatherData, setWeatherData] = useState([]);
  const cityNameRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("cityName: ", cityNameRef.current.value);

    let API_KEY = '26ae9a0b27a97215beaa4b5df9aa15fb';
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${API_KEY}&units=metric`
      );

      console.log(response.data);
      setWeatherData([response.data, ...weatherData]);
    } catch (error) {
      // handle error
      console.log(error.data);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="flex justify-between items-center p-[0.5em] w-[100%] rounded-[10px] bg-[#fdfdfd]">
        <input
          id="cityNameInput"
          type="text"
          required
          minLength={2}
          maxLength={20}
          //   onChange={(e) => setCityName(e.target.value)}
          ref={cityNameRef}
        />
        <br />
        <button type="submit">Get Weather</button>
      </form>

      <hr />

      {weatherData.length ? (
        weatherData.map((eachWeatherData, index) => {
          return <WeatherCard key={index} weatherData={eachWeatherData} />;
        })
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};

export default Home;
