// src/App.jsx - COMPLETE FIXED VERSION WITH ALL FEATURES + MOBILE RESPONSIVE
// ✅ Fixed: Abuja and all cities work, Live timestamp, Refresh, Favorites
// ✅ Mobile: Hamburger menu, responsive layout, touch-friendly
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, X, Sun, Moon, Star, Leaf, MapPin, RefreshCw, Clock } from 'lucide-react';
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
  const [refreshing, setRefreshing] = useState(false);
  
  // ✅ Live timestamp
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // ✅ Mobile responsive states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // ✅ Favorites start EMPTY
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ecopulse_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [theme, setTheme] = useState('dark');

  const filters = ['All', 'Clear', 'Clouds', 'Rain'];

  // ✅ Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Check screen size for mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.sidebar') && !e.target.closest('.hamburger-btn')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // ✅ Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('ecopulse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ✅ FETCH WEATHER - FIXED FOR ALL CITIES
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`🌍 Fetching weather for: ${city}`);
      
      // Format city name for Nigerian cities to help API
      let searchCity = city;
      if (city.toLowerCase() === 'abuja') {
        searchCity = 'Abuja, NG';
      } else if (city.toLowerCase() === 'lagos') {
        searchCity = 'Lagos, NG';
      }
      
      const timestamp = new Date().getTime();
      
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&_=${timestamp}`
      );
      
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric&_=${timestamp}`
      );
      
      const actualTemp = weatherRes.data.main.temp;
      console.log(`✅ ${city} temperature: ${actualTemp}°C`);
      
      const current = {
        city: city,
        country: weatherRes.data.sys.country,
        temp: Math.round(actualTemp),
        feelsLike: Math.round(weatherRes.data.main.feels_like),
        humidity: weatherRes.data.main.humidity,
        windSpeed: Math.round(weatherRes.data.wind.speed * 3.6),
        pressure: weatherRes.data.main.pressure,
        tempMin: Math.round(weatherRes.data.main.temp_min),
        tempMax: Math.round(weatherRes.data.main.temp_max),
        condition: weatherRes.data.weather[0].main,
        description: weatherRes.data.weather[0].description
      };
      
      setWeatherData(current);
      
      const dailyForecasts = {};
      forecastRes.data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const hour = date.getHours();
        
        if (hour >= 11 && hour <= 14 && !dailyForecasts[dayName]) {
          dailyForecasts[dayName] = {
            day: dayName,
            temp: Math.round(item.main.temp),
            condition: item.weather[0].main
          };
        }
      });
      
      setForecastData(Object.values(dailyForecasts).slice(0, 5));
      
    } catch (err) {
      console.error('API Error:', err);
      
      // Try fallback without country code
      if (err.response?.status === 404) {
        try {
          console.log('Trying without country code...');
          const fallbackRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          
          const actualTemp = fallbackRes.data.main.temp;
          const current = {
            city: city,
            country: fallbackRes.data.sys.country,
            temp: Math.round(actualTemp),
            feelsLike: Math.round(fallbackRes.data.main.feels_like),
            humidity: fallbackRes.data.main.humidity,
            windSpeed: Math.round(fallbackRes.data.wind.speed * 3.6),
            pressure: fallbackRes.data.main.pressure,
            tempMin: Math.round(fallbackRes.data.main.temp_min),
            tempMax: Math.round(fallbackRes.data.main.temp_max),
            condition: fallbackRes.data.weather[0].main,
            description: fallbackRes.data.weather[0].description
          };
          
          setWeatherData(current);
          setError(null);
          return;
        } catch (fallbackErr) {
          setError(`City "${city}" not found.`);
        }
      } else if (err.response?.status === 401) {
        setError('Invalid API key.');
      } else if (err.response?.status === 429) {
        setError('API limit reached. Please wait.');
      } else {
        setError(`Failed to load weather for "${city}"`);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ✅ Refresh weather
  const refreshWeather = () => {
    if (selectedCity) {
      setRefreshing(true);
      setWeatherData(null);
      fetchWeather(selectedCity);
    }
  };

  // ✅ Search for cities
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

  // ✅ Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) searchCity();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ✅ Initial load
  useEffect(() => {
    fetchWeather('Lagos');
  }, []);

  // ✅ Fetch when selected city changes
  useEffect(() => {
    if (selectedCity && weatherData?.city !== selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  // ✅ Select city
  const selectCity = (cityName) => {
    setSelectedCity(cityName);
    setSearchQuery('');
    setShowResults(false);
    if (isMobile) setIsMobileMenuOpen(false);
  };

  // ✅ Toggle favorite
  const toggleFavorite = (city) => {
    setFavorites(prev => {
      if (prev.includes(city)) {
        return prev.filter(f => f !== city);
      } else {
        return [...prev, city];
      }
    });
  };

  // ✅ Retry fetch
  const retryFetchWeather = () => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  };

  // ✅ Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // ✅ Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // ✅ Get weather icon
  const getWeatherIcon = (condition) => {
    const c = condition?.toLowerCase() || '';
    if (c === 'clear') return '☀️';
    if (c === 'clouds') return '⛅';
    if (c.includes('rain')) return '🌧️';
    if (c.includes('snow')) return '❄️';
    return '⛅';
  };

  // ✅ Filter forecast
  const filteredForecast = activeFilter === 'All' 
    ? forecastData 
    : forecastData.filter(day => day.condition === activeFilter);

  // ✅ CSS Variables
  const cssVariables = {
    dark: {
      '--bg-primary': '#0F172A',
      '--bg-secondary': '#1E293B',
      '--text-primary': '#F1F5F9',
      '--text-secondary': '#94A3B8',
    },
    light: {
      '--bg-primary': '#F8FAFC',
      '--bg-secondary': '#FFFFFF',
      '--text-primary': '#1E293B',
      '--text-secondary': '#64748B',
    }
  };

  const currentTheme = cssVariables[theme];
  Object.keys(currentTheme).forEach(key => {
    document.documentElement.style.setProperty(key, currentTheme[key]);
  });

  const isCurrentCityFavorite = weatherData ? favorites.includes(weatherData.city) : false;

  // ✅ Loading state
  if (loading && !weatherData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0F172A' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '48px' }}>🌍</div>
          <h2>Loading EcoPulse...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* HAMBURGER MENU BUTTON - MOBILE ONLY */}
      {isMobile && (
        <button 
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'flex',
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 1001,
            background: '#00D4FF',
            border: 'none',
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#0F172A'
          }}
        >
          ☰
        </button>
      )}

      {/* SIDEBAR */}
      <div style={{ 
        width: '280px', 
        backgroundColor: 'var(--bg-secondary)',
        padding: '32px 24px',
        borderRight: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        height: '100vh',
        position: isMobile ? 'fixed' : 'sticky',
        left: 0,
        top: 0,
        overflowY: 'auto',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000,
        transform: isMobile && !isMobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
        boxShadow: isMobile && isMobileMenuOpen ? '2px 0 8px rgba(0,0,0,0.2)' : 'none'
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

        {/* CITIES LIST */}
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
              <div
                onClick={(e) => { 
                  e.stopPropagation(); 
                  toggleFavorite(city); 
                }}
                style={{ cursor: 'pointer', padding: '4px' }}
              >
                <Star
                  size={16}
                  fill={favorites.includes(city) ? '#FFD700' : 'none'}
                  stroke={favorites.includes(city) ? '#FFD700' : 'currentColor'}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: '1px', backgroundColor: 'rgba(0, 212, 255, 0.2)', marginBottom: '24px' }} />

        {/* FAVORITES SECTION */}
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

      {/* MOBILE OVERLAY */}
      {isMobile && isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}

      {/* MAIN CONTENT */}
      <div style={{ 
        marginLeft: isMobile ? '0px' : '280px', 
        padding: isMobile ? '70px 16px 16px 16px' : '32px', 
        flex: 1, 
        overflowY: 'auto', 
        height: '100vh', 
        backgroundColor: 'var(--bg-primary)' 
      }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          
          {/* Search Bar */}
          <div style={{ position: 'relative', flex: 1, maxWidth: isMobile ? '100%' : '350px', width: '100%' }}>
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
                fontSize: '16px',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <X size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-secondary)' }} 
                onClick={() => { setSearchQuery(''); setShowResults(false); }} />
            )}
            
            {/* SEARCH RESULTS */}
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
                      padding: '12px 16px', 
                      borderBottom: idx !== searchResults.length - 1 ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` : 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <div onClick={() => selectCity(cityName)} style={{ flex: 1, cursor: 'pointer' }}>
                        <div style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>{cityName}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{city.country}{city.state ? `, ${city.state}` : ''}</div>
                      </div>
                      <div
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          toggleFavorite(cityName); 
                        }}
                        style={{ cursor: 'pointer', padding: '8px' }}
                      >
                        <Star
                          size={18}
                          fill={isFavorite ? '#FFD700' : 'none'}
                          stroke={isFavorite ? '#FFD700' : 'var(--text-secondary)'}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* LIVE TIMESTAMP */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-secondary)',
              padding: '8px 16px',
              borderRadius: '48px',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>LIVE</span>
              <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
              <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>
                {formatTime(currentTime)}
              </span>
            </div>

            {/* REFRESH BUTTON */}
            <button
              onClick={refreshWeather}
              disabled={refreshing}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '48px',
                padding: '10px 16px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: refreshing ? 0.7 : 1,
                minHeight: '44px'
              }}
            >
              <RefreshCw 
                size={16} 
                style={{ 
                  color: '#00D4FF',
                  animation: refreshing ? 'spin 1s linear infinite' : 'none'
                }} 
              />
              <span style={{ fontSize: '13px', fontWeight: '500' }}>Refresh</span>
            </button>

            {/* THEME TOGGLE */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, 
                borderRadius: '48px', 
                padding: '10px 20px', 
                cursor: 'pointer', 
                color: 'var(--text-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                minHeight: '44px'
              }}>
              {theme === 'dark' ? <Sun size={18} style={{ color: '#FFD700' }} /> : <Moon size={18} style={{ color: '#00D4FF' }} />}
              <span style={{ fontSize: '13px', fontWeight: '500' }}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>

        {/* FILTER PILLS */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {filters.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)}
              style={{ padding: '8px 24px', borderRadius: '40px', backgroundColor: activeFilter === filter ? '#00D4FF' : 'var(--bg-secondary)', color: activeFilter === filter ? '#0F172A' : 'var(--text-primary)', border: activeFilter === filter ? 'none' : `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, cursor: 'pointer', fontSize: '14px', fontWeight: activeFilter === filter ? '600' : '400', minHeight: '44px' }}>
              {filter}
            </button>
          ))}
        </div>

        {/* ERROR WITH RETRY */}
        {error && (
          <div style={{ 
            backgroundColor: 'rgba(239,68,68,0.15)', 
            border: '1px solid #ef4444', 
            borderRadius: '10px', 
            padding: '14px 18px', 
            marginBottom: '24px', 
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <span>⚠️ {error}</span>
            <button
              onClick={retryFetchWeather}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                minHeight: '44px'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* WEATHER DISPLAY */}
        {weatherData && (
          <>
            <WeatherCard weather={weatherData} />
            
            <div style={{ position: 'relative' }}>
              <WeatherOverview weatherData={weatherData} theme={theme} />
              
              {/* FAVORITE BUTTON */}
              <button
                onClick={() => toggleFavorite(weatherData.city)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: isCurrentCityFavorite ? 'rgba(255, 215, 0, 0.15)' : 'var(--bg-secondary)',
                  border: `1px solid ${isCurrentCityFavorite ? '#FFD700' : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
                  borderRadius: '48px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-primary)',
                  minHeight: '44px'
                }}
              >
                <Star
                  size={18}
                  fill={isCurrentCityFavorite ? '#FFD700' : 'none'}
                  stroke={isCurrentCityFavorite ? '#FFD700' : 'currentColor'}
                />
                <span style={{ fontSize: '13px', fontWeight: '500' }}>
                  {isCurrentCityFavorite ? 'Saved' : 'Add to Favorites'}
                </span>
              </button>
            </div>
          </>
        )}

        {/* 5-DAY FORECAST */}
        {forecastData.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>5-Day Forecast</h2>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {formatDate(currentTime)}
              </span>
            </div>
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;