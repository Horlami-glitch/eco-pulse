// src/components/Sidebar.jsx
import { Star } from 'lucide-react';

const Sidebar = ({ 
  selectedCity, 
  onCitySelect, 
  favorites, 
  onToggleFavorite 
}) => {
  const cities = ['Lagos', 'Abuja', 'London', 'New York', 'Tokyo'];

  return (
    <div style={{
      width: '280px',
      background: 'var(--bg-secondary)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      borderRight: '1px solid rgba(255,255,255,0.1)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto'
    }}>
      <div>
        <h1 style={{ 
          color: 'var(--accent-cyan)', 
          fontSize: '28px',
          marginBottom: '8px'
        }}>
          EcoPulse
        </h1>
        <p className="body-text" style={{ opacity: 0.7, fontSize: '12px' }}>
          Weather & Sustainability
        </p>
      </div>

      <div>
        <h3 className="subtitle" style={{ 
          marginBottom: '16px', 
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          opacity: 0.8
        }}>
          CITIES
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {cities.map(city => (
            <div
              key={city}
              onClick={() => onCitySelect(city)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '8px',
                background: selectedCity === city ? 'var(--accent-cyan)' : 'transparent',
                color: selectedCity === city ? 'var(--dark-bg-primary)' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: selectedCity === city ? '600' : '400'
              }}
              onMouseEnter={(e) => {
                if (selectedCity !== city) {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCity !== city) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span>{city}</span>
              <Star
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(city);
                }}
                fill={favorites.includes(city) ? '#FFD700' : 'none'}
                stroke={favorites.includes(city) ? '#FFD700' : 'currentColor'}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>

      {favorites.length > 0 && (
        <div>
          <h3 className="subtitle" style={{ 
            marginBottom: '16px', 
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            opacity: 0.8
          }}>
            FAVORITES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {favorites.map(city => (
              <div
                key={city}
                onClick={() => onCitySelect(city)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: selectedCity === city ? 'var(--accent-cyan)' : 'transparent',
                  color: selectedCity === city ? 'var(--dark-bg-primary)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Star size={14} fill="#FFD700" stroke="#FFD700" style={{ opacity: 0.8 }} />
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;