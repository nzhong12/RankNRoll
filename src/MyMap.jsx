import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import data from './colleges.json';
import L from 'leaflet';

const Map = () => {
    // The center of the map, you can change the initial position if needed
    const initialPosition = [42.373611, -71.109733]; // Example: Harvard
    const colleges = data.slice(0,20);
    console.log(colleges.length);

    const greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    return (
      <div>
        <h2>College Map</h2>
      
        <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {colleges.map((college, index) => (
            <Marker icon={greenIcon} key={`item-${index}`} position={[Number(college.LAT), Number(college.LON)]}>
              <Popup>{college.displayName}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>    
    );

  };
  
  export default Map;