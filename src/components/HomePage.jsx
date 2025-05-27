import React, { useEffect, useState } from 'react'
import './styles/map.css';
import Axios from 'axios';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plot';
import './styles/home.css';

const HomePage = ( props ) => {
  const [showPopup, setShowPopup] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [plusCode, setPlusCode] = useState("");

  const togglePopMenu = () => {
    setShowPopup(!showPopup);
  }

  const btnCancel = () => {
    setShowPopup(false);
  }

  const handlePlusCode = (plusCodes) => {
    setPlusCode(plusCodes);

    console.log("Plus Code:", plusCodes);
  };

  const handleDraw = (coordinates) => {
    console.log("Clicked!");
    
    try {
      const parsedCoordinates = JSON.parse(coordinates);
      
      if (Array.isArray(parsedCoordinates) && parsedCoordinates.length >= 3) {
        const closedPolygon = [...parsedCoordinates, parsedCoordinates[0]];

        const feature = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [closedPolygon],
        },
        properties: {},
      };

      setGeoJsonData(feature);

      console.log("GeoJSON Data:", feature);

      } else {
        console.error("Invalid coordinates format");
      }
    } catch (error) {
      console.error("Error parsing coordinates:", error);
    }
  };

  return (
    <div className="home-container">
        <Navigation 
         logoutClick = {props.onLogout}
         togglePlotting = {togglePopMenu}
         isPlotOpen = {showPopup}
         />

        {showPopup && (
            <Plot
              onDraw = {handleDraw} 
              onClose = {btnCancel}
              plusCodes = {handlePlusCode}
              plusCode = {plusCode}
              geoJsonData = {geoJsonData}
            />
         )}
         


        <div className="leaflet-wrapper">
          <LeafletMap 
            geoJsonData = {geoJsonData}
            handlePlusCodes = {handlePlusCode}
          />
      </div>

    </div>
  )
}

export default HomePage;