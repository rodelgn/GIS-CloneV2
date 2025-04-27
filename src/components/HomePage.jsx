import React, { useState } from 'react'
import './styles/map.css';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plot';
import './styles/home.css';

const HomePage = ( props ) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopMenu = () => {
    setShowPopup(!showPopup);
  }

  const btnCancel = () => {
    setShowPopup(false);
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