import React, { useState } from 'react'
import './styles/map.css';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plot';

const HomePage = ( props ) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopMenu = () => {
    setShowPopup(!showPopup);
  }

  return (
    <div className="home-container">
        <Navigation 
         logoutClick = {props.onLogout}
         togglePlotting={togglePopMenu}
         />

        {showPopup && (
            <Plot 
            onClose={() => setShowPlotForm(false)} 
            />
         )}
         


        <div className="leaflet-wrapper">
        <LeafletMap />
      </div>

    </div>
  )
}

export default HomePage;