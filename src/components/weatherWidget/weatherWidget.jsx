import "./weatherWidget.css";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="card text-[#fff] flex flex-col justify-right gap-[1em] items-start">
      <h1 className="ov-x text-center w-[100%] text-[1.3em] text-[#ff6677]">{weatherData.name}</h1>
      <h1 className="text-[2em] w-[100%] text-center text-[#fec55e]">{weatherData?.main.temp} °C</h1>
      <div className="flex justify-center gap-[1em] items-center w-[100%] text-[#ff6677]">
        <p className="text-[#fff]">{weatherData.sys.country}</p>
        <p>{weatherData.weather[0]?.description}</p>
      </div>
      <p className="text-[0.8em] w-[100%] text-left text-[#fff] flex justify-left items-center gap-[1em]"><p className="bi bi-droplet"></p><p>Humidity : {weatherData.main.humidity} °C</p></p>
      <p className="text-[0.8em] w-[100%] text-left text-[#fff] flex justify-left items-center gap-[1em]"><p className="bi bi-wind"></p><p>Wind : {(((weatherData.wind.speed) * 2.9).toFixed())} km/h</p></p>
      <p className="text-[0.8em] w-[100%] text-left text-[#fff] flex justify-left items-center gap-[1em]"><p className="bi bi-hurricane"></p><p>Pressure : {weatherData.main.pressure} Pascals</p></p>
      <p className="text-[0.8em] w-[100%] text-left text-[#fff] flex justify-left items-center gap-[1em]"><p className="bi bi-thermometer-half"></p><p> Min Temp : {weatherData.main.temp_min} °C</p></p>
      <p className="text-[0.8em] w-[100%] text-left text-[#fff] flex justify-left items-center gap-[1em]"><p className="bi bi-thermometer-high "></p><p>Max Temp : {weatherData.main.temp_max} °C</p></p>
    </div>

  );
};

export default WeatherCard;
