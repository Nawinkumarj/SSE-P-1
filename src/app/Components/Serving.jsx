import React from 'react';
const LOCATIONS = [
  { name: 'Kundathur', lat: 13.0107, lng: 80.0956 },
  { name: 'Porur', lat: 13.0352, lng: 80.1638 },
  { name: 'Kancheepuram', lat: 12.8342, lng: 79.7036 },
  { name: 'Mangadu', lat: 13.0417, lng: 80.1078 },
  { name: 'Poonamallee', lat: 13.0487, lng: 80.1107 },
];

export default function Serving() {
  return (
    <div className="serving-container">
      <h2 className="serving-heading">Serving areas</h2>
      <div className="serving-content">
        <div className="serving-map">
          {/* Example: show attached map image until custom map ready */}
          <img 
            src="Screenshot-2025-11-12-at-3.28.40-PM.jpg" 
            alt="Chennai Map Example" 
            className="map-img"
          />
          {/* Later replace <img> with interactive map and custom pins */}
        </div>
        <div className="serving-details">
          {LOCATIONS.map(loc => (
            <div key={loc.name} className="serving-location">
              <h3>{loc.name}</h3>
              <p>Lat: {loc.lat}, Lng: {loc.lng}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
