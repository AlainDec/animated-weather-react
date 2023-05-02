import { useState } from 'react';
import Weather from '../Weather';
import reactLogo from './react-logo.svg';
import './styles.scss';
import Input from '../Input';

function App() {
  
  const units = {
    fahrenheit: {
      name: 'standard',
      symbol: '°F',
      unitKey: 'Fahrenheit',
    },
    celcius: {
      name: 'metric',
      symbol: '°C',
      unitKey: 'Celcius',
    },
    kelvin: {
      name: 'imperial',
      symbol: '°K',
      unitKey: 'Kelvin',
    },
  };

  const [unit, setUnit] = useState(units.celcius);
  const [inputCityValue, setInputCityValue] = useState('');
  const [inputZipCodeValue, setInputZipCodeValue] = useState('');

  // récupère les clés des unités ['fahrenheit', 'celcius', 'kelvin']
  const unitKeys = Object.keys(units);
    // Récupère les unités dans l'ordre [{ "name": "standard", "symbol": "°F"}, { ... }, {...}]
  const unitOrder = unitKeys.map(key => units[key]); 
  
  const toggleUnit = () => {
    const unitKeys = Object.keys(units);
    const currentIndex = unitOrder.findIndex(item => JSON.stringify(item) === JSON.stringify(unit));
    const nextIndex = (currentIndex + 1) % unitKeys.length;
    setUnit(units[unitKeys[nextIndex]]);
  };

  const getButtonTemperatureLabel = () => `${unit.unitKey} (${unit.symbol})`;

  const handleInputValue = (value) => {
    if (isNaN(value)) {
      setInputCityValue(value);
      setInputZipCodeValue('');
    } else {
      setInputZipCodeValue(value);
      setInputCityValue('');
    }
  }

  return (
    <div className="app">
      {/* <img src={reactLogo} alt="react logo" /> */}
      <button onClick={ toggleUnit }>{ getButtonTemperatureLabel() }</button>
      <h1>Météo via l'API openweathermap.org</h1>
      <Input handleInputValue={ handleInputValue } />

      <Weather city={ inputCityValue } zipCode={ inputZipCodeValue } units={ unit } />
      <Weather city="Saint-Tropez" zipCode="83990" units={ unit } />
      <Weather city="Le Mesnil-le-Roi" zipCode="78600" units={ unit } />
    </div>
  );
}

export default App;
