import React from 'react';
import './Label.css';

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`ui-label ${className}`}>{children}</label>
);

export default Label; 