import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';

const SetMapBounds = () => {
  const map = useMap(); // Access the map instance
  
  useEffect(() => {
    const southwest = [34.8, -124.4194]; // of US map
    const northeast = [40.8, -70.0060];  
    const southwest1 = [23.8, -134.4194]; // outside US
    const northeast1 = [50.8, -60.0060]; 
    // Fit the map to these bounds
    map.fitBounds([southwest, northeast], { padding: [100, 100] });
    map.setMaxBounds([southwest1, northeast1]); //allows enough space at zoom in
    //map.setMaxBoundsViscosity(0.8);

    map.setMinZoom(5);  //about twice as large as US
    map.setMaxZoom(15); //close enough to view college location
  }, []);

  return null;
};

//n: # of colleges are selected. n=8 is special case for the Ivy League.
const getIcon = (college, n) => {
  const baseUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/';
  let iconUrl = baseUrl + 'marker-icon-2x-green.png';   
  let iconSize = [25, 41];
  let shadowSize = [41, 41];
  let iconAnchor = [12, 41];
  
  if (n === 8 && college.iconType === "Ivy") {
    iconUrl = './' + college.iconImage + '.png';  //each ivy has unique icon
    iconSize = [30, 30];
    shadowSize = [40, 40];
    iconAnchor = [20, 20];
  } 
  else if (college.iconType === "Ivy") {
    iconUrl = baseUrl + 'marker-icon-2x-blue.png';
  }
  else if (college.sortRank <= 10) {
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

// Recenter the map whenever the center prop changes
const ChangeMapCenter = ({ center }) => {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    if (center) {
      map.setView(center, 9); 
    }
  }, [center, map]);

  return null; // This component doesn't render anything visible
};

const Map = ({ colleges = [], initialPosition }) => {
    
  const mapRef = useRef(null);
    useEffect(() => {
      if (initialPosition && mapRef.current) {  //not sure about mapRef.current
        mapRef.current.setView(initialPosition, 10); // 
      }
    }, [initialPosition]);

    return (
      <div>
        <h2><i>U.S. News</i> Ranked College Map</h2>
      
        <MapContainer center={initialPosition} zoom={10} scrollWheelZoom={true} maxBoundsViscosity={0.6} whe>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {colleges.map((college, index) => (
            <Marker icon={getIcon(college, colleges.length)} key={`item-${index}`} position={[Number(college.LAT), Number(college.LON)]}>
              <Popup><a href={college.WEBADDR} target="_blank">{college.displayName}</a></Popup>
              <Tooltip direction="right" offset={[10, 0]} opacity={0.85}>{"#" + college.sortRank + ": " + college.displayName}</Tooltip> 
              {/* <Tooltip direction="right" offset={[10, 0]} opacity={0.85} permanent>{"#" + college.sortRank}</Tooltip>*/}
            </Marker>
          ))}

          <SetMapBounds />
          <ChangeMapCenter center={initialPosition} />

        </MapContainer>
      </div>    
    );

  };
  
  export default Map;