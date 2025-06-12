import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { usePolygonCoordinates } from './hooks/usePolygonCoordinates';
import { PlusCodes } from 'olc-plus-codes'


// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LeafletMap = ( props ) => {
  const mapRef = useRef(null);
  const drawnLayerRef = useRef(L.featureGroup());
  const mapInitialized = useRef(false); 
  const { polygonCoordinates } = usePolygonCoordinates();


  //Initialized Map
  useEffect(() => {
      if (!mapInitialized.current) {
      
        const map = L.map("leaflet-map", {
        center: [7.078987297874518, 125.5428209424999],
        zoom: 13,
        zoomControl: false,
      });

      //Starting tile Layers
      const openStreetMap = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: ["a", "b", "c"],
        }
      );

      const eriSatteliteMap = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 21,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );

      const googleHybrid = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        {
          maxZoom: 21,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      ).addTo(map);

      const googleSatteliteMap = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
          maxZoom: 21,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );

      const googleTerrainMap = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        {
          maxZoom: 21,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );

      const googleStreetMap = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          maxZoom: 21,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );

      const mapLayer = {
        Open_Street: openStreetMap,
        ESRISatellite: eriSatteliteMap,
        Google_Satellite: googleSatteliteMap,
        Google_Hybrid: googleHybrid,
        Google_Terrain: googleTerrainMap,
        Google_Street: googleStreetMap,
      };

      L.control.layers( mapLayer, null, {
        position: "topleft",
        collapsed: true,
      }).addTo(map);

      //Zoom Control
      L.control.zoom({ position: "topleft" }).addTo(map);
      map.getContainer().style.cursor = "pointer";
      mapRef.current = map;

      drawnLayerRef.current.addTo(map);

      mapInitialized.current = true;
    } 
    
  });

  useEffect(() => {
    //Center Coordinate to get Plus Code
    const calculateCenterCoordinates = (coordinates) => {
      var sumLat = 0;
      var sumlng = 0;

      for (let i = 0; i < coordinates.length; i++) {
        sumLat += coordinates[i][1];
        sumlng += coordinates[i][0];
      }

      const centerLat = sumLat / coordinates.length;
      const centerLng = sumlng / coordinates.length;
      const plusCode = new PlusCodes();
      const centroidPlusCode = plusCode.encode(centerLat, centerLng, 12);

      return [centerLat, centerLng, centroidPlusCode];
    };

    // Draw A Polygon
    if (mapInitialized.current) {
      if (Array.isArray(polygonCoordinates) && polygonCoordinates.length > 0 ) {
        const formattedPolygonCoordinates = polygonCoordinates.map((coord) => [
          coord[1],
          coord[0],
        ]);
        const polygon = L.polygon(formattedPolygonCoordinates, {
          color: "red",
        });

        drawnLayerRef.current.clearLayers().addLayer(polygon);
        mapRef.current.fitBounds(polygon.getBounds(), { maxZoom: 19 });

        var centerCoord = calculateCenterCoordinates(polygonCoordinates);
        var centerLng = centerCoord[0];
        var centerLat = centerCoord[1];
        var centroidPlusCode = centerCoord[2];

        var popUpContent = "<p>Centroid</p>";
        popUpContent += "<pre>Latitude: " + centerLat.toFixed(6) + 
        ", Longitude: " + centerLng.toFixed(6) + "</pre>";
        popUpContent += "<p>Pluscode: </p>";
        popUpContent += "<pre>" + centroidPlusCode + "</pre>";

        polygon.bindPopup(popUpContent);

        props.handlePlusCodes(centroidPlusCode);
      }
    }
  }, [polygonCoordinates]);

  return (
    <section className="map-component">
      <div className='map' style={{ position: "relative" }}>
        <div id="leaflet-map" />
      </div>
    </section>
  );
};

export default LeafletMap;