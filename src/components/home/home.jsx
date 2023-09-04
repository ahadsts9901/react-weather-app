import { useState, useRef, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../weatherWidget/weatherWidget";
import './home.css'

const Home = () => {
  // not recommended
  // const [cityName, setCityName] = useState("");

  const [weatherData, setWeatherData] = useState([]);
  const cityNameRef = useRef(null);

  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        console.log("location: ", location);

        try {
          let API_KEY = "e0f99c494c2ce394a18cc2fd3f100543";
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric`,
            {
              signal: controller.signal,
            }
          );
          console.log(response.data);

          setCurrentLocationWeather(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.data);
          setIsLoading(false);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      // cleanup function
      controller.abort();
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("cityName: ", cityNameRef.current.value);

    let API_KEY = "e0f99c494c2ce394a18cc2fd3f100543";
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${API_KEY}&units=metric`
      );

      // console.log(response.data);
      setWeatherData([response.data, ...weatherData]);
      setIsLoading(false);
      cityNameRef.current.value = ""
    } catch (error) {
      // handle error
      console.log(error?.data);
      setIsLoading(false);
    }
  };

  return (
    <div>
      
      <div className="head bg-[#171d2501] flex flex-col justify-right items-center gap-[1em] sticky top-0 z-20">
      <h1 className="z-[30] mb-[1em] flex justify-center itens-center gap-[0.5em] text-center w-[100%] text-[#fec55e] bi bi-cloud-sun text-[1.5em]"><span className="text-[#fff]">Weather</span><span className="text-[#ff6677]">App</span></h1>
      <form onSubmit={submitHandler} className="z-[30] mb-[1em] w-[100%] flex justify-center items-center gap[1em] bg-[#fff] p-[0.5em] rounded-[15px]">
        <input
          id="cityNameInput"
          type="text"
          required
          minLength={2}
          maxLength={20}
          //   onChange={(e) => setCityName(e.target.value)}
          ref={cityNameRef}
          className="bg-[#fff] p-[0.5em] w-[100%]"
          placeholder="Enter City Name..."
        />
        <br />
        <button type="submit" className="text-[#fff] bg-[#ff6677] p-[0.5em] rounded-[10px]">Search</button>
      </form>
      </div>

      <div className="result p-[1em] w-[100%] flex flex-wrap justify-center items-start h-[100%]">

        {weatherData.length || currentLocationWeather || isLoading ? null : <div>No Data</div>}

        {weatherData.map((eachWeatherData, index) => {
          return <WeatherCard key={index} weatherData={eachWeatherData} />;
        })}

        {currentLocationWeather ? <WeatherCard weatherData={currentLocationWeather} /> : null}
      </div>

    </div>
  );
};

export default Home;
