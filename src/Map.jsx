import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
//import data from './colleges.json';
import L from 'leaflet';

const SetMapBounds = () => {
  const map = useMap(); // Access the map instance
  
  useEffect(() => {
    // Create an array of lat/lng coordinates
    const southwest = [34.8, -124.4194]; // San Francisco
    const northeast = [40.8, -70.0060];  // New York
    const southwest1 = [24, -134.4194]; 
    const northeast1 = [51, -60.0060]; 
    // Fit the map to these bounds
    map.fitBounds([southwest, northeast], { padding: [100, 100] });
    map.setMaxBounds([southwest1, northeast1]);
    //map.setMaxBoundsViscosity(0.8);

    map.setMinZoom(5);
    map.setMaxZoom(15);
  }, [map]);

  return null;
};

const createCustomIcon = (college) => {
  let iconUrl;
  //let size[,];
  
  if (college.icon == null) {
    iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';  // Icon for top 10 colleges
  } else if (college.ranking < 20) {
    iconUrl = '/icons/top50.png';  // Icon for top 50 colleges
  } else {
    iconUrl = '/icons/default.png'; // Default icon for other colleges
  }

  return L.icon({
    iconUrl, // Set the icon URL based on ranking
    iconSize: [25, 41], // Customize size
    iconAnchor: [12, 41], // Point where the icon is anchored
    popupAnchor: [1, -34], // Position of the popup relative to the icon
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41], // Shadow size
  });
};

const Map = ({ colleges = [] }) => {
    // The center of the map, you can change the initial position if needed
    const initialPosition = [37.8, -97]; 
    //const colleges = data.slice(0,20);
    console.log(colleges.length + " colleges passed");

    const greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const brownIcon = new L.Icon({
      iconUrl: './brown.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 25],
      //iconAnchor: [12, 41],
      //popupAnchor: [1, -34],
      shadowSize: [35, 35]
    });

    return (
      <div>
       {/*  <h2>College Map</h2> */}
      
        <MapContainer center={initialPosition} zoom={10} scrollWheelZoom={true} maxBoundsViscosity={0.6}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {colleges.map((college, index) => (
            <Marker icon={college.iconType == "Ivy"? brownIcon : greenIcon} key={`item-${index}`} position={[Number(college.LAT), Number(college.LON)]}>
              <Popup>{college.displayName}</Popup>
            </Marker>
          ))}

          <SetMapBounds />
        </MapContainer>
      </div>    
    );

  };
  
  export default Map;