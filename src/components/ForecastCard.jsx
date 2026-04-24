const ForecastCard = ({ day, temp, tempMin, condition, originalCondition }) => {
  const getWeatherIcon = (conditionName) => {
    const conditionLower = conditionName.toLowerCase();
    if (conditionLower === 'clear') return '☀️';
    if (conditionLower === 'clouds') return '☁️';
    if (conditionLower === 'rain') return '🌧️';
    if (conditionLower === 'snow') return '❄️';
    if (conditionLower === 'thunderstorm') return '⛈️';
    return '🌡️';
  };

  return (
    <div className="forecast-card">
      <p className="label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>{day}</p>
      <div style={{ fontSize: '36px', marginBottom: '8px' }}>
        {getWeatherIcon(condition)}
      </div>
      <p className="body-text" style={{ fontWeight: 'bold', fontSize: '18px' }}>
        {temp}°C
      </p>
      {tempMin && (
        <p className="label" style={{ opacity: 0.7, marginTop: '4px' }}>
          ↓ {tempMin}°C
        </p>
      )}
      <p className="label" style={{ opacity: 0.7, marginTop: '6px' }}>
        {condition}
      </p>
    </div>
  );
};

export default ForecastCard;