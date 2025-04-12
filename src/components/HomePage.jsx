import React from 'react'
import './styles/map.css';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';

const HomePage = ( props ) => {
  return (
    <div className="home-container">
        <Navigation 
         logoutClick = {props.onLogout}
         />

        <div className="leaflet-wrapper">
        <LeafletMap />
      </div>

    </div>
  )
}

export default HomePage