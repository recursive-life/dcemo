import React from 'react';
import './AlertDialog.css';

const AlertDialog = ({ open, title, description, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="alert-dialog-backdrop">
      <div className="alert-dialog-content">
        <div className="alert-dialog-header">
          <h3 className="alert-dialog-title">{title}</h3>
          <p className="alert-dialog-description">{description}</p>
        </div>
        <div className="alert-dialog-footer">
          <button className="alert-dialog-btn cancel" onClick={onCancel}>Cancel</button>
          <button className="alert-dialog-btn action" onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog; 