import React, { useState } from 'react'
import './styles/map.css';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plot';
import './styles/home.css';

const HomePage = ( props ) => {
  const [showPopup, setShowPopup] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  const togglePopMenu = () => {
    setShowPopup(!showPopup);
  }

  const btnCancel = () => {
    setShowPopup(false);
  }

  const handleDraw = (coordinates) => {
    console.log("Clicked!");
  }

  return (
    <div className="home-container">
        <Navigation 
         logoutClick = {props.onLogout}
         togglePlotting={togglePopMenu}
         isPlotOpen={showPopup}
         />

        {showPopup && (
            <Plot
              onDraw={handleDraw} 
              onClose={btnCancel}
            />
         )}
         


        <div className="leaflet-wrapper">
        <LeafletMap />
      </div>

    </div>
  )
}

export default HomePage;