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

  useEffect(() => {

    // const fetchGeoJsonData = async () => {

    //   try {
    //     const response = await Axios.get("/plottingData");

    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const rows = await response.json();

    //     const features = rows.map((row) => {

    //       try {
    //         const parsed = JSON.parse(row.geojson);

    //         if (parsed.type === "Feature" && parsed.geometry !=null && parsed.geometry.type === "Polygon") {
    //           return parsed;
    //         }
    //       } catch (err) {
    //         console.warn("Skipping invalid GeoJSON:", row.id, err);
    //       } 
    //       return null;

    //     }).filter((f) => f !== null);

    //     if (features.length === 0) {
    //       setGeoJsonData(null);
    //       return;
    //     }

    //     const featureCollection = {
    //       type: "FeatureCollection",
    //       features: features,
    //     };

    //     setGeoJsonData(featureCollection);

    //   } catch (error) {
    //     console.error("Error fetching Plotting Data: ", error);
    //     setGeoJsonData(null);
    //   }
    // };

    // fetchGeoJsonData();

  }, []);

  const togglePopMenu = () => {
    setShowPopup(!showPopup);
  }

  const btnCancel = () => {
    setShowPopup(false);
  }

  const handlePlusCode = (plusCodes) => {
    setPlusCode(plusCodes); 
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