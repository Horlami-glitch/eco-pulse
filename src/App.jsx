// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, X, Sun, Moon, Star, Leaf, MapPin } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import WeatherOverview from './components/WeatherOverview';

const API_KEY = "220db65e69d4cb0f916d8250900b7fb9";

function App() {
  const [selectedCity, setSelectedCity] = useState('Lagos');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ecopulse_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [theme, setTheme] = useState('dark');

  const filters = ['All', 'Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'];

  useEffect(() => {
    localStorage.setItem('ecopulse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching real weather for: ${city}`); // Debug log
      
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      console.log('Weather API Response:', weatherRes.data); // Debug log - check actual temperature
      
      const current = {
        city: weatherRes.data.name,
        country: weatherRes.data.sys.country,
        temp: Math.round(weatherRes.data.main.temp),
        feelsLike: Math.round(weatherRes.data.main.feels_like),
        humidity: weatherRes.data.main.humidity,
        windSpeed: Math.round(weatherRes.data.wind.speed * 3.6),
        pressure: weatherRes.data.main.pressure,
        tempMin: Math.round(weatherRes.data.main.temp_min),
        tempMax: Math.round(weatherRes.data.main.temp_max),
        condition: weatherRes.data.weather[0].main,
        description: weatherRes.data.weather[0].description,
        icon: weatherRes.data.weather[0].icon
      };
      
      const dailyForecasts = {};
      forecastRes.data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const hour = date.getHours();
        
        if (hour >= 11 && hour <= 14 && !dailyForecasts[dayName]) {
          dailyForecasts[dayName] = {
            day: dayName,
            temp: Math.round(item.main.temp),
            condition: item.weather[0].main,
            icon: item.weather[0].icon
          };
        }
      });
      
      setWeatherData(current);
      setForecastData(Object.values(dailyForecasts).slice(0, 5));
      
      console.log('Processed weather data:', current); // Debug log
      
    } catch (err) {
      console.error('API Error:', err.response?.data || err.message);
      
      if (err.response?.status === 404) {
        setError(`City "${city}" not found. Please check the spelling.`);
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (err.response?.status === 429) {
        setError('API rate limit exceeded. Please try again later.');
      } else {
        setError(`Unable to load weather data for "${city}". Please check your internet connection.`);
      }
    }
    setLoading(false);
  };

  const searchCity = async () => {
    if (searchQuery.length < 2) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${API_KEY}`
      );
      setSearchResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(searchCity, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const selectCity = (cityName) => {
    setSelectedCity(cityName);
    setSearchQuery('');
    setShowResults(false);
  };

  const toggleFavorite = (city) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(city)) {
        return prevFavorites.filter(f => f !== city);
      } else {
        return [...prevFavorites, city];
      }
    });
  };

  const getWeatherIcon = (condition) => {
    const c = condition?.toLowerCase() || '';
    if (c === 'clear') return '☀️';
    if (c === 'clouds') return '⛅';
    if (c.includes('rain')) return '🌧️';
    if (c.includes('snow')) return '❄️';
    if (c.includes('thunder')) return '⛈️';
    return '⛅';
  };

  const filteredForecast = activeFilter === 'All' 
    ? forecastData 
    : forecastData.filter(day => day.condition === activeFilter);

  const cssVariables = {
    dark: {
      '--bg-primary': '#0F172A',
      '--bg-secondary': '#1E293B',
      '--text-primary': '#F1F5F9',
      '--text-secondary': '#94A3B8',
      '--shadow-md': '0 8px 32px rgba(0, 0, 0, 0.2)'
    },
    light: {
      '--bg-primary': '#F8FAFC',
      '--bg-secondary': '#FFFFFF',
      '--text-primary': '#1E293B',
      '--text-secondary': '#64748B',
      '--shadow-md': '0 8px 32px rgba(0, 0, 0, 0.08)'
    }
  };

  const currentTheme = cssVariables[theme];
  Object.keys(currentTheme).forEach(key => {
    document.documentElement.style.setProperty(key, currentTheme[key]);
  });

  // Debug: Show actual temperature in console
  if (weatherData) {
    console.log('Current weather displayed:', {
      city: weatherData.city,
      temp: weatherData.temp,
      feelsLike: weatherData.feelsLike,
      condition: weatherData.condition
    });
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
          <div style={{ fontSize: '48px' }}>🌍</div>
          <h2>Loading EcoPulse...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar - Same as before */}
      <div style={{ 
        width: '280px', 
        backgroundColor: 'var(--bg-secondary)',
        padding: '32px 24px',
        borderRight: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Leaf size={28} style={{ color: '#00D4FF' }} />
            <h1 style={{ color: '#00D4FF', fontSize: '24px', fontWeight: '700', margin: 0 }}>EcoPulse</h1>
          </div>
          <p style={{ fontSize: '12px', opacity: 0.7, color: 'var(--text-secondary)', margin: 0 }}>
            Weather & Sustainability
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: 'rgba(0, 212, 255, 0.2)', marginBottom: '32px' }} />

        {/* Cities */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '16px', opacity: 0.7, color: 'var(--text-secondary)', letterSpacing: '1px' }}>
            CITIES
          </h3>
          {['Lagos', 'Abuja', 'London', 'New York', 'Tokyo'].map(city => (
            <div
              key={city}
              onClick={() => selectCity(city)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: selectedCity === city ? '#00D4FF' : 'transparent',
                color: selectedCity === city ? '#0F172A' : 'var(--text-primary)',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: selectedCity === city ? '#0F172A' : '#00D4FF' }} />
                <span style={{ fontSize: '14px', fontWeight: selectedCity === city ? '600' : '400' }}>
                  {city}
                </span>
              </div>
              <Star
                size={16}
                onClick={(e) => { e.stopPropagation(); toggleFavorite(city); }}
                fill={favorites.includes(city) ? '#FFD700' : 'none'}
                stroke={favorites.includes(city) ? '#FFD700' : 'currentColor'}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>

        <div style={{ height: '1px', backgroundColor: 'rgba(0, 212, 255, 0.2)', marginBottom: '24px' }} />

        {/* Favorites */}
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '16px', opacity: 0.7, color: 'var(--text-secondary)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={12} fill="#FFD700" stroke="#FFD700" />
            FAVORITES {favorites.length > 0 && `(${favorites.length})`}
          </h3>
          
          {favorites.length > 0 ? (
            favorites.map(city => (
              <div
                key={city}
                onClick={() => selectCity(city)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: selectedCity === city ? '#00D4FF' : 'transparent',
                  color: selectedCity === city ? '#0F172A' : 'var(--text-primary)',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <MapPin size={14} style={{ color: selectedCity === city ? '#0F172A' : '#00D4FF' }} />
                <span style={{ fontSize: '14px', fontWeight: selectedCity === city ? '600' : '400' }}>
                  {city}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', padding: '8px 12px', fontStyle: 'italic', opacity: 0.7 }}>
              Click ☆ to add favorites
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '280px', padding: '32px', flex: 1, overflowY: 'auto', height: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#00D4FF', zIndex: 1 }} />
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                backgroundColor: 'var(--bg-secondary)',
                border: `1px solid ${showResults ? '#00D4FF' : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
                borderRadius: '48px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <X size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-secondary)' }} 
                onClick={() => { setSearchQuery(''); setShowResults(false); }} />
            )}
            
            {/* Search Results */}
            {showResults && searchResults.length > 0 && (
              <div style={{ 
                position: 'absolute', top: '100%', left: 0, right: 0, 
                backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', 
                marginTop: '8px', zIndex: 1000, 
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', overflow: 'hidden', maxHeight: '300px', overflowY: 'auto'
              }}>
                {searchResults.map((city, idx) => {
                  const cityName = city.name;
                  const isFavorite = favorites.includes(cityName);
                  
                  return (
                    <div key={idx} style={{ 
                      padding: '12px 16px', cursor: 'pointer', 
                      borderBottom: idx !== searchResults.length - 1 ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` : 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <div onClick={() => selectCity(cityName)} style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>{cityName}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{city.country}{city.state ? `, ${city.state}` : ''}</div>
                      </div>
                      <Star
                        size={18}
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(cityName); }}
                        fill={isFavorite ? '#FFD700' : 'none'}
                        stroke={isFavorite ? '#FFD700' : 'currentColor'}
                        style={{ cursor: 'pointer', color: isFavorite ? '#FFD700' : 'var(--text-secondary)', flexShrink: 0, marginLeft: '12px' }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ backgroundColor: 'var(--bg-secondary)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderRadius: '48px', padding: '10px 20px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {theme === 'dark' ? <Sun size={18} style={{ color: '#FFD700' }} /> : <Moon size={18} style={{ color: '#00D4FF' }} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {filters.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)}
              style={{ padding: '8px 24px', borderRadius: '40px', backgroundColor: activeFilter === filter ? '#00D4FF' : 'var(--bg-secondary)', color: activeFilter === filter ? '#0F172A' : 'var(--text-primary)', border: activeFilter === filter ? 'none' : `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, cursor: 'pointer', fontSize: '14px', fontWeight: activeFilter === filter ? '600' : '400' }}>
              {filter}
            </button>
          ))}
        </div>

        {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', borderRadius: '10px', padding: '14px', marginBottom: '24px', color: '#ef4444' }}>⚠️ {error}</div>}

        {/* Weather Display */}
        {weatherData && (
          <>
            <WeatherCard weather={weatherData} />
            <WeatherOverview weatherData={weatherData} theme={theme} />
          </>
        )}

        {/* 5-Day Forecast */}
        {forecastData.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>5-Day Forecast</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
              {filteredForecast.map((day, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>{day.day}</p>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{getWeatherIcon(day.condition)}</div>
                  <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>{day.temp}°C</p>
                  <p style={{ fontSize: '12px', opacity: 0.7, color: 'var(--text-secondary)' }}>{day.condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;