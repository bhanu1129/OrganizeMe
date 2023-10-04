import { useState, useEffect } from 'react';
import styles from '../Styles/Weather.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Weather = ({ apiKey }) => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [dailyForecast, setDailyForecast] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (event) => {
    if(event.key === "Enter"){
        axios.get(weatherUrl).then((response) =>{
            setWeatherData(response.data);
            setError(null);
        })
        .catch((error)=>{
          setError("Please enter a valid location");
          setWeatherData({});
        })
        axios.get(forecastUrl).then((response) =>{
            setForecastData(response.data);
        })
        setLocation('');
    }
  }

  useEffect(() => {
    if (forecastData.list) {
      const forecastList = forecastData.list;
      const dailyData = {};

      forecastList.forEach((forecast) => {
        const date = new Date(forecast.dt_txt).toDateString();
        if (!dailyData[date]) {
          dailyData[date] = [];
        }
        dailyData[date].push(forecast);
      });

      setDailyForecast(dailyData);
    }
  }, [forecastData]);

  const handleHome = () => {
    navigate('/');
  }
  
  return (
    <div className={styles.weather}>

        <div className={styles.container}>
            <div className={styles.search}>
                <input 
                    value={location}
                    type="text"
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                />
            </div>

            <div className={styles.top}>
                <div className={styles.location}>
                  {error ? (
                    <p>{error}</p>
                  ) : 
                    <p>{weatherData.name}</p>
                  }
                </div>
                <div className={styles.temp}>
                    {weatherData.main ? <h1 class={styles.big}>{Math.floor(weatherData.main.temp)}°C</h1> : null}
                </div>
                <div>
                    {weatherData.weather ? <p className={styles.description}><img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="img" />{weatherData.weather[0].description}</p> : null}
                </div>
            </div>

            <div className={styles.middle}>
                <div>
                    <p className={styles.bold}>Forecast</p>
                </div>
                <div>
                    {Object.keys(dailyForecast).map((date) => (
                      <details 
                        key={date}
                        open={openDropdown === date}
                      >
                        <summary 
                          onClick={(e) => {
                            e.preventDefault();
                            openDropdown === date ? setOpenDropdown(null) : setOpenDropdown(date);
                          }}
                        >
                          {date}
                        </summary>
                        <div className={styles.forecastRow}>
                          {dailyForecast[date].map((forecast, index) => (
                            <div key={index} className={styles.forecastCard}>
                              <p>{new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                              <p><img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="img" />{forecast.weather[0].main}</p>
                              <p>{Math.floor(forecast.main.temp)}°C</p>
                            </div>
                          ))}
                        </div>
                      </details>
                    ))}
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.feels}>
                    {weatherData.main ? <p className={styles.bold}>{Math.floor(weatherData.main.feels_like)}°C</p> : null}
                    <p>Feels Like</p>
                </div>
                <div className={styles.humidity}>
                {weatherData.main ? <p className={styles.bold}>{weatherData.main.humidity}%</p> : null}
                    <p>Humidity</p>
                </div>
                <div className={styles.wind}>
                    {weatherData.wind ? <p className={styles.bold}>{Math.floor((weatherData.wind.speed * 3600)/1000)}Km/h</p> : null}
                    <p>Wind Speed</p>
                </div>
            </div>

            <div className={styles.home}>
              <button 
                className={styles.homeBtn}
                onClick={handleHome}
              >
                Back to Home
              </button>
            </div>
        </div>

    </div>
  )
}

export default Weather