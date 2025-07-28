import React from 'react';

const Admin = ({ themes, selectedTheme, onThemeChange, onCustomize }) => {
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="form-group">
        <label htmlFor="theme-select">Select Theme:</label>
        <select id="theme-select" value={selectedTheme} onChange={onThemeChange}>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="color-picker">Color:</label>
        <input type="color" id="color-picker" onChange={(e) => onCustomize('color', e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="scale-slider">Scale:</label>
        <input
          type="range"
          id="scale-slider"
          min="0.1"
          max="2"
          step="0.1"
          onChange={(e) => onCustomize('scale', parseFloat(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rotation-x-slider">Rotation X:</label>
        <input
          type="range"
          id="rotation-x-slider"
          min="0"
          max={Math.PI * 2}
          step="0.1"
          onChange={(e) => onCustomize('rotationX', parseFloat(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rotation-y-slider">Rotation Y:</label>
        <input
          type="range"
          id="rotation-y-slider"
          min="0"
          max={Math.PI * 2}
          step="0.1"
          onChange={(e) => onCustomize('rotationY', parseFloat(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rotation-z-slider">Rotation Z:</label>
        <input
          type="range"
          id="rotation-z-slider"
          min="0"
          max={Math.PI * 2}
          step="0.1"
          onChange={(e) => onCustomize('rotationZ', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Admin;
