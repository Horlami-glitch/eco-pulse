import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeatherChart = ({ data, dataKey = 'temp', color = '#00D4FF' }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        background: 'var(--bg-secondary)', 
        borderRadius: '16px', 
        padding: '20px',
        textAlign: 'center' 
      }}>
        <p className="body-text">No temperature data available</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '20px' }}>
      <h3 className="subtitle" style={{ marginBottom: '16px' }}>Temperature Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="var(--text-primary)" />
          <YAxis stroke="var(--text-primary)" />
          <Tooltip 
            contentStyle={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--accent-cyan)',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;