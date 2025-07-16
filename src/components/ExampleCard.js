import React from 'react';

const ExampleCard = ({ title, description }) => {
  return (
    <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem', marginBottom: '1rem' }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: '0.5rem 0 0 0', color: '#555' }}>{description}</p>
    </div>
  );
};

export default ExampleCard; 