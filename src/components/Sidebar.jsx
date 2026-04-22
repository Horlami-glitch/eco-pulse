// src/components/Sidebar.jsx
import { Star, MapPin } from 'lucide-react';

const Sidebar = ({ 
  selectedCity, 
  onCitySelect, 
  favorites = [], // Default to empty array
  onToggleFavorite 
}) => {
  // Cities list - just display, no auto-favorite
  const cities = ['Lagos', 'Abuja', 'London', 'New York', 'Tokyo'];

  return (
    <div style={{
      width: '280px',
      background: 'var(--bg-secondary, #0d2228)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      borderRight: '1px solid rgba(0, 196, 138, 0.15)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto'
    }}>
      {/* Logo Section */}
      <div>
        <h1 style={{ 
          color: '#00c48a', 
          fontSize: '28px',
          marginBottom: '8px',
          fontWeight: '700'
        }}>
          EcoPulse
        </h1>
        <p style={{ 
          opacity: 0.7, 
          fontSize: '12px',
          color: 'var(--text-secondary, #8899a6)',
          letterSpacing: '0.3px'
        }}>
          Weather & Sustainability
        </p>
      </div>

      {/* Cities Section */}
      <div>
        <h3 style={{ 
          marginBottom: '16px', 
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '1.2px',
          opacity: 0.7,
          color: 'var(--text-secondary, #8899a6)',
          textTransform: 'uppercase'
        }}>
          Cities
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {cities.map(city => (
            <div
              key={city}
              onClick={() => onCitySelect(city)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 12px',
                borderRadius: '12px',
                background: selectedCity === city ? 'rgba(0, 196, 138, 0.15)' : 'transparent',
                color: selectedCity === city ? '#00c48a' : 'var(--text-primary, #ffffff)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: selectedCity === city ? '600' : '400',
                border: selectedCity === city ? '1px solid rgba(0, 196, 138, 0.3)' : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (selectedCity !== city) {
                  e.currentTarget.style.background = 'rgba(0, 196, 138, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCity !== city) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: '#00c48a', opacity: 0.8 }} />
                <span>{city}</span>
              </div>
              <Star
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(city);
                }}
                fill={favorites.includes(city) ? '#FFD700' : 'none'}
                stroke={favorites.includes(city) ? '#FFD700' : 'currentColor'}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: favorites.includes(city) ? 1 : 0.5
                }}
                onMouseEnter={(e) => {
                  if (!favorites.includes(city)) {
                    e.currentTarget.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!favorites.includes(city)) {
                    e.currentTarget.style.opacity = '0.5';
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Favorites Section - Only shows if there are favorites */}
      {favorites.length > 0 && (
        <div>
          <h3 style={{ 
            marginBottom: '16px', 
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '1.2px',
            opacity: 0.7,
            color: 'var(--text-secondary, #8899a6)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Star size={12} fill="#FFD700" stroke="#FFD700" />
            Favorites
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {favorites.map(city => (
              <div
                key={city}
                onClick={() => onCitySelect(city)}
                style={{
                  padding: '12px 12px',
                  borderRadius: '12px',
                  background: selectedCity === city ? 'rgba(0, 196, 138, 0.15)' : 'transparent',
                  color: selectedCity === city ? '#00c48a' : 'var(--text-primary, #ffffff)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: selectedCity === city ? '600' : '400',
                  border: selectedCity === city ? '1px solid rgba(0, 196, 138, 0.3)' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (selectedCity !== city) {
                    e.currentTarget.style.background = 'rgba(0, 196, 138, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCity !== city) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <MapPin size={14} style={{ color: '#00c48a', opacity: 0.8 }} />
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show message if no favorites */}
      {favorites.length === 0 && (
        <div>
          <h3 style={{ 
            marginBottom: '16px', 
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '1.2px',
            opacity: 0.7,
            color: 'var(--text-secondary, #8899a6)',
            textTransform: 'uppercase'
          }}>
            Favorites
          </h3>
          <p style={{ 
            color: 'var(--text-secondary, #8899a6)', 
            fontSize: '13px',
            padding: '8px 12px',
            fontStyle: 'italic',
            opacity: 0.7
          }}>
            Click the star ☆ to add favorites
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;