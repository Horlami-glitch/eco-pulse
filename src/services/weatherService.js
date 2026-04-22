import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data fallback (for when API key is not available)
const USE_MOCK = !API_KEY;

const mockWeatherData = {
  name: 'Lagos',
  sys: { country: 'NG' },
  main: { temp: 32, feels_like: 31, humidity: 83, pressure: 1012 },
  weather: [{ main: 'Clouds', description: 'overcast clouds' }],
  wind: { speed: 7 }
};

export const fetchWeatherData = async (city) => {
  if (USE_MOCK) {
    console.log('Using mock data for:', city);
    return { ...mockWeatherData, name: city };
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key');
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchForecastData = async (city) => {
  if (USE_MOCK) {
    return Array(7).fill(null).map((_, i) => ({
      dt_txt: new Date(Date.now() + i * 86400000).toISOString(),
      main: { 
        temp: 30 + i, 
        feels_like: 29 + i, 
        temp_min: 28 + i, 
        temp_max: 32 + i,
        humidity: 80 - i * 5 
      },
      weather: [{ main: 'Clouds', description: 'scattered clouds' }]
    }));
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY
      }
    });
    
    return response.data.list.filter(item => 
      item.dt_txt.includes('12:00:00')
    );
  } catch (error) {
    console.error('Forecast error:', error);
    return [];
  }
};