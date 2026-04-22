import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city) => {
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
      throw new Error('City not found. Please check the spelling.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
    } else if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch weather data. Please check your internet connection.');
  }
};

export const fetchForecastData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY
      }
    });
    
    // Get one forecast per day (at 12:00)
    const dailyForecasts = response.data.list.filter(item => 
      item.dt_txt.includes('12:00:00')
    );
    
    return dailyForecasts;
  } catch (error) {
    console.error('Forecast fetch error:', error);
    throw new Error('Failed to fetch forecast data.');
  }
};