import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.scss';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '5f512e793cd4a2574cdf55eb4f55ceb9';

function Weather({city, zipCode, units}) {
  const [temperature, setTemperature] = useState(0);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl;
        if (zipCode) {
          apiUrl = `${API_URL}zip=${zipCode},fr&appid=${API_KEY}&units=${units.name}`;
        } else {
          apiUrl = `${API_URL}q=${city},fr&appid=${API_KEY}&units=${units.name}`;
        }
        const result = await axios.get(apiUrl);

        setTemperature(Math.round(result.data.main.temp));
        setIcon(`https://openweathermap.org/img/wn/${result.data.weather[0].icon}.png`);
      }
      catch (e) {
        console.log("Axios error API request: " + e);
      }
    }

    // Si pas de saisie dans le formulaire, pas de fetchData
    if (city || zipCode) {
      fetchData();
    }
  }, [zipCode, city, units.symbol]);

  const getTemperature = () => `${temperature} ${units.symbol}`;

  return (
    ( city || zipCode ) && (
      <div className="weather">
        <div>
          <h2>{city}</h2>
          <p>{zipCode}</p>
          <p className="temperature">{getTemperature()}</p>
        </div>
        <div>
          <img src={icon} />
        </div>
      </div>
    )
  );
}

export default Weather;
