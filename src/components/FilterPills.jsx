import { Cloud, CloudRain, CloudSnow, CloudLightning, Sun, Layers } from 'lucide-react';

const filters = [
  { name: 'All', icon: Layers },
  { name: 'Clear', icon: Sun },
  { name: 'Clouds', icon: Cloud },
  { name: 'Rain', icon: CloudRain },
  { name: 'Snow', icon: CloudSnow },
  { name: 'Thunderstorm', icon: CloudLightning }
];

const FilterPills = ({ activeFilter, onFilterChange }) => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '12px', 
      flexWrap: 'wrap'
    }}>
      {filters.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => onFilterChange(name)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '40px',
            fontSize: '14px',
            fontWeight: activeFilter === name ? '600' : '500',
            backgroundColor: activeFilter === name ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
            color: activeFilter === name ? 'var(--dark-bg-primary)' : 'var(--text-primary)',
            border: activeFilter === name ? 'none' : '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            if (activeFilter !== name) {
              e.currentTarget.style.backgroundColor = 'rgba(0,212,255,0.1)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeFilter !== name) {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }
          }}
        >
          <Icon size={16} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterPills;