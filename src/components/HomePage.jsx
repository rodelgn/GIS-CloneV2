import { useState } from 'react'
import { usePolygonCoordinates } from './hooks/usePolygonCoordinates';
import './styles/map.css';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plotting/Plot';
import './styles/home.css';

const HomePage = ( props ) => {
  const [showPopup, setShowPopup] = useState(false);
  const { setPolygonCoordinates } = usePolygonCoordinates();
  const [plusCode, setPlusCode] = useState("");

  const togglePopMenu = () => {
    setShowPopup(!showPopup);
  }

  const btnCancel = () => {
    setShowPopup(false);
  }

  const handlePlusCode = (plusCodes) => {
    setPlusCode(plusCodes); 
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
              onClose = {btnCancel}
              plusCodes = {handlePlusCode}
              plusCode = {plusCode}
              setPolygonCoordinates = {setPolygonCoordinates}
            />
         )}
         


        <div className="leaflet-wrapper">
          <LeafletMap 
            handlePlusCodes = {handlePlusCode}
            setPolygonCoordinates = {setPolygonCoordinates}
          />
      </div>

    </div>
  )
}

export default HomePage;