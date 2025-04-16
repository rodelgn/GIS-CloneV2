import React, { useState } from 'react'
import './styles/map.css';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plot';

const HomePage = ( props ) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="home-container">
        <Navigation 
         logoutClick = {props.onLogout}
         />

         <Plot />


        <div className="leaflet-wrapper">
        <LeafletMap />
      </div>

    </div>
  )
}

export default HomePage;