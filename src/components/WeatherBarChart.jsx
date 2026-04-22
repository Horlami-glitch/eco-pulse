// src/components/WeatherBarChart.jsx
import { Thermometer, Sunrise, Sunset } from 'lucide-react';

const WeatherBarChart = ({ hourlyData, theme }) => {
  if (!hourlyData || hourlyData.length === 0) return null;

  // Find max and min temps for scaling
  const temps = hourlyData.map(h => h.temp);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const range = maxTemp - minTemp;

  const getBarHeight = (temp) => {
    if (range === 0) return 60;
    const percentage = (temp - minTemp) / range;
    return 40 + (percentage * 40); // Between 40px and 80px
  };

  const getBarColor = (temp) => {
    if (temp >= 30) return '#EF4444';
    if (temp >= 25) return '#F59E0B';
    if (temp >= 20) return '#10B981';
    return '#00D4FF';
  };

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
      borderRadius: '20px',
      padding: '28px',
      marginBottom: '32px'
    }}>
      {/* Header with Title and Icons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Thermometer size={24} style={{ color: '#00D4FF' }} />
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: theme === 'dark' ? '#F1F5F9' : '#1E293B',
            margin: 0
          }}>
            Weather Overview
          </h3>
        </div>
        <div style={{
          display: 'flex',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sunrise size={16} style={{ color: '#F59E0B' }} />
            <span style={{
              fontSize: '12px',
              color: theme === 'dark' ? '#F1F5F9' : '#1E293B',
              opacity: 0.7
            }}>
              Sunrise 6:42 AM
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sunset size={16} style={{ color: '#F59E0B' }} />
            <span style={{
              fontSize: '12px',
              color: theme === 'dark' ? '#F1F5F9' : '#1E293B',
              opacity: 0.7
            }}>
              Sunset 6:42 PM
            </span>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '8px',
        marginBottom: '16px',
        height: '200px'
      }}>
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {/* Bar */}
            <div style={{
              width: '100%',
              height: `${getBarHeight(hour.temp)}px`,
              backgroundColor: getBarColor(hour.temp),
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              position: 'relative',
              cursor: 'pointer'
            }}>
              {/* Temperature label on bar */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '11px',
                fontWeight: '600',
                color: getBarColor(hour.temp),
                whiteSpace: 'nowrap'
              }}>
                {hour.temp}°
              </div>
            </div>
            {/* Time label */}
            <div style={{
              fontSize: '11px',
              color: theme === 'dark' ? '#F1F5F9' : '#1E293B',
              opacity: 0.7,
              textAlign: 'center'
            }}>
              {hour.time}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#EF4444', borderRadius: '3px' }}></div>
          <span style={{ fontSize: '11px', opacity: 0.7 }}>≥30°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#F59E0B', borderRadius: '3px' }}></div>
          <span style={{ fontSize: '11px', opacity: 0.7 }}>25-29°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981', borderRadius: '3px' }}></div>
          <span style={{ fontSize: '11px', opacity: 0.7 }}>20-24°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#00D4FF', borderRadius: '3px' }}></div>
          <span style={{ fontSize: '11px', opacity: 0.7 }}>&lt;20°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherBarChart;