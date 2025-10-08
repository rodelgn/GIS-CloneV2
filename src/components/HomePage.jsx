import { useState } from 'react'
import { usePolygonCoordinates } from './hooks/usePolygonCoordinates';
import './styles/map.css';
import Navigation from './navBar/Navigation';
import LeafletMap from './LeafletMap';
import Plot from './Plotting/Plot';
import Kml from './KML/Kml';
import Monuments from './monuments/Monuments';
import UserManagement from './management/UserManagement';
import './styles/home.css';

const HomePage = ( props ) => {
  const [showPopupPlot, setShowPopupPlot] = useState(false);
  const [showKML, setShowKML] = useState(false)
  const [showMonuments, setShowMonuments] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const { setPolygonCoordinates } = usePolygonCoordinates();
  const [plusCode, setPlusCode] = useState("");
  const [kmlGeoJsonData, setKmlGeoJsonData] = useState(null);
  const [kmlPluscode, setKmlPluscode] = useState({});

  const togglePopMenu = () => {
    setShowPopupPlot(!showPopupPlot);
  }

  const toggleKML = () => {
    setShowKML(!showKML);
  }

  const toggleMonument = () => {
    setShowMonuments(!showMonuments);
  }

  const toggleUserManagement = () => {
    setUserManagementOpen(!userManagementOpen);
  }

  const btnCancel = () => {
    setShowPopupPlot(false);
    setShowKML(false);
    setShowMonuments(false);
    setUserManagementOpen(false);
  }

  const handlePlusCode = (plusCode) => {
    setPlusCode(plusCode);
    console.log("Plus Code in Home: ", plusCode)
  };

  const handleKmlPlusCodes = (index, kmlPluscode) => {
    setKmlPluscode ((prev) => ({
      ...prev,
      [index]: kmlPluscode,
    }));

    console.log("KML Plus Codes in Home: ", kmlPluscode)
  }

  const handleKMLUploadCoord = (geoJson) => {
    if (geoJson?.features?.length > 0 ) {
      setKmlGeoJsonData(geoJson);
    } else {
      console.warn("Invalid or empty GeoJson from KML.")
    }

    console.log('Coordinates: ', geoJson)
  };

  return (
    <div className="home-container">
        <Navigation 
         logoutClick = {props.onLogout}
         togglePlotting = {togglePopMenu}
         toggleKML = {toggleKML}
         toggleMonument = {toggleMonument}
         toggleUsersManagement = {toggleUserManagement}
         isPlotOpen = {showPopupPlot}
         />

        {showPopupPlot && (
            <Plot
              onClose = {btnCancel}
              plusCode = {plusCode}
              setPolygonCoordinates = {setPolygonCoordinates}
            />
         )}

         {showKML && ( 
            <Kml 
              onClose = {btnCancel}
              onKMLUpload = {handleKMLUploadCoord}
              kmlPluscode = {kmlPluscode}
            />
         )}

         {showMonuments && (
            <Monuments 
              onClose = {btnCancel}
            />
         )}

         {userManagementOpen && (
            <UserManagement 
              onClose = {btnCancel}
            />
         )}

        <div className="leaflet-wrapper">
          <LeafletMap 
            handlePlusCodes = {handlePlusCode}
            setPolygonCoordinates = {setPolygonCoordinates}
            kmlGeoJsonData = {kmlGeoJsonData}
            kmlPlusCodes = {handleKmlPlusCodes}
          />
      </div>

    </div>
  )
};

export default HomePage;