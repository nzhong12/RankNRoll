import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
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
  }, []);

  return null;
};

const getIcon = (college, n) => {
  const baseUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/';
  let iconUrl = baseUrl + 'marker-icon-2x-green.png';   
  let iconSize = [25, 41];
  let shadowSize = [41, 41];
  let iconAnchor = [12, 41];
  
  if (n === 8 && college.iconType === "Ivy") {
    iconUrl = './' + college.iconImage + '.png';
    iconSize = [30, 30];
    shadowSize = [40, 40];
    iconAnchor = [20, 20];
  } else if (college.iconType === "Ivy") {
    iconUrl = baseUrl + 'marker-icon-2x-red.png';
  }
  
  return L.icon({
    iconUrl, // Set the icon URL based on ranking
    iconSize: iconSize, // Customize size
    iconAnchor: iconAnchor, // Point where the icon is anchored
    popupAnchor: [1, -34], // Position of the popup relative to the icon
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: shadowSize, // Shadow size
  });
};

const ChangeMapCenter = ({ center }) => {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    if (center) {
      map.setView(center, 10); // Recenter the map whenever the center prop changes
      
      //map.fitBounds([center[0]-2, [center[1]-2], [34.8, -124.4194]], { padding: [100, 100] });
    }
  }, [center, map]);

  return null; // This component doesn't render anything visible
};

const Map = ({ colleges = [], initialPosition }) => {
    // The center of the map, you can change the initial position if needed
    //const initialPosition = [37.8, -97]; 
    //const colleges = data.slice(0,20);
    console.log(initialPosition[0] + " passed");
   /*  useEffect(() => {
      if (selectedCollege && initialPosition) {
        mapRef.current.setView([selectedCollege.lat, selectedCollege.lng], 13); // Set the zoom level to 13
      }
    }, [initialPosition]); */
    const mapRef = useRef(null);
    useEffect(() => {
      if (initialPosition && mapRef.current) {
        mapRef.current.setView(initialPosition, 10); // Set the zoom level to 13
      }
    }, [initialPosition]);

    return (
      <div>
        <h2>College Map</h2>
      
        <MapContainer center={initialPosition} zoom={10} scrollWheelZoom={true} maxBoundsViscosity={0.6} whe>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {colleges.map((college, index) => (
            <Marker icon={getIcon(college, colleges.length)} key={`item-${index}`} position={[Number(college.LAT), Number(college.LON)]}>
              <Popup><a href={college.WEBADDR} target="_blank">{college.displayName}</a></Popup>
              <Tooltip direction="right" offset={[10, 0]} opacity={0.85}>{"#" + college.sortRank + ": " + college.displayName}</Tooltip>
            </Marker>
          ))}

          <SetMapBounds />
          <ChangeMapCenter center={initialPosition} />

        </MapContainer>
      </div>    
    );

  };
  
  export default Map;