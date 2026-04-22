// src/components/WeatherCard.jsx (keeping the existing layout)
import { Droplet, Wind, Thermometer, Gauge, MapPin, ArrowUp, ArrowDown } from 'lucide-react';

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '24px',
        padding: '28px',
        textAlign: 'center',
        color: 'var(--text-secondary)'
      }}>
        Loading weather data...
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower === 'clear' || conditionLower === 'sunny') return '☀️';
    if (conditionLower === 'clouds' || conditionLower === 'cloudy' || conditionLower === 'partly cloudy') return '⛅';
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('thunder')) return '⛈️';
    return '⛅';
  };

  const cityName = weather.city || weather.name || 'Lagos';
  const countryCode = weather.country || 'NG';
  const temperature = weather.temp || weather.main?.temp || '--';
  const tempMin = weather.tempMin || weather.main?.temp_min || '--';
  const tempMax = weather.tempMax || weather.main?.temp_max || '--';
  const condition = weather.description || weather.weather?.[0]?.description || 'Partly Cloudy';
  const humidity = weather.humidity || weather.main?.humidity || '--';
  const windSpeed = weather.windSpeed || weather.wind?.speed || '--';
  const feelsLike = weather.feelsLike || weather.main?.feels_like || '--';
  const pressure = weather.pressure || weather.main?.pressure || '--';

  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '24px',
      padding: '28px',
      transition: 'all 0.2s ease',
      border: '1px solid rgba(0, 212, 255, 0.15)',
      boxShadow: 'var(--shadow-md)',
    }}>
      
      {/* Top Row: Location Icon + City */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '24px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            borderRadius: '50%'
          }}>
            <MapPin size={22} style={{ color: '#00D4FF', strokeWidth: 2 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: '700', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {cityName}
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>
              {countryCode}
            </span>
          </div>
        </div>
      </div>

      {/* Today Label */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{
          fontSize: '13px',
          color: '#00D4FF',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: '600',
          background: 'rgba(0, 212, 255, 0.1)',
          padding: '4px 14px',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          Today
        </span>
      </div>

      {/* Main Content Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '30px'
      }}>
        
        {/* Left Section: Temperature and High/Low */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: '72px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-2px', lineHeight: '1', marginBottom: '16px' }}>
            {temperature}°C
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUp size={16} style={{ color: '#10B981' }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>High:</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#10B981' }}>{tempMax}°C</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowDown size={16} style={{ color: '#EF4444' }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Low:</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#EF4444' }}>{tempMin}°C</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Weather Icon */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '80px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))', marginBottom: '12px' }}>
            {getWeatherIcon(condition)}
          </div>
          <div style={{ fontSize: '16px', color: '#00D4FF', fontWeight: '500', textTransform: 'capitalize' }}>
            {condition}
          </div>
        </div>

        {/* Right Section: Stats in Vertical Line */}
        <div style={{ flex: 1, borderLeft: '1px solid rgba(0, 212, 255, 0.2)', paddingLeft: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplet size={18} style={{ color: '#00D4FF' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Humidity</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{humidity}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wind size={18} style={{ color: '#00D4FF' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Wind Speed</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{windSpeed} km/h</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Thermometer size={18} style={{ color: '#00D4FF' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Feels Like</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{feelsLike}°C</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gauge size={18} style={{ color: '#00D4FF' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Pressure</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;