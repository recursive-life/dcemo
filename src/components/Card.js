import React from 'react';
import './Card.css';

const Card = ({ children, className = '' }) => (
  <div className={`ui-card ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="ui-card-header">{children}</div>
);
export const CardTitle = ({ children }) => (
  <h2 className="ui-card-title">{children}</h2>
);
export const CardDescription = ({ children }) => (
  <p className="ui-card-description">{children}</p>
);
export const CardAction = ({ children }) => (
  <div className="ui-card-action">{children}</div>
);
export const CardContent = ({ children }) => (
  <div className="ui-card-content">{children}</div>
);
export const CardFooter = ({ children, className = '' }) => (
  <div className={`ui-card-footer ${className}`}>{children}</div>
);

export default Card; 