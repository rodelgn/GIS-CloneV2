import { useState } from 'react'
import { usePolygonCoordinates } from './hooks/usePolygonCoordinates';
import './styles/map.css';
import Navigation from './Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plotting/Plot';
import Kml from './Kml';
import './styles/home.css';

const HomePage = ( props ) => {
  const [showPopupPlot, setShowPopupPlot] = useState(false);
  const [showKML, setShowKML] = useState(false)
  const { setPolygonCoordinates } = usePolygonCoordinates();
  const [plusCode, setPlusCode] = useState("");

  const togglePopMenu = () => {
    setShowPopupPlot(!showPopupPlot);
  }

  const toggleKML = () => {
    setShowKML(!showKML);
  }

  const btnCancel = () => {
    setShowPopupPlot(false);
    setShowKML(false);
  }

  const handlePlusCode = (plusCodes) => {
    setPlusCode(plusCodes); 
  };

  const handleKMLUploadCoord = (convertedGeoJSON) => {
    if (convertedGeoJSON?.features?.length > 0 ) {
      setPolygonCoordinates(convertedGeoJSON);
    } else {
      console.warn("Invalid or empty GeoJson from KML.")
    }

    console.log('Coordinates: ', convertedGeoJSON)
  };

  return (
    <div className="home-container">
        <Navigation 
         logoutClick = {props.onLogout}
         togglePlotting = {togglePopMenu}
         toggleKML = {toggleKML}
         isPlotOpen = {showPopupPlot}
         />

        {showPopupPlot && (
            <Plot
              onClose = {btnCancel}
              plusCodes = {handlePlusCode}
              plusCode = {plusCode}
              setPolygonCoordinates = {setPolygonCoordinates}
            />
         )}

         {showKML && ( 
            <Kml 
              onClose = {btnCancel}
              onKMLUpload = {handleKMLUploadCoord}
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
};

export default HomePage;