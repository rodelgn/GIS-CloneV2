import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
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
  const drawLayerRef = useRef(L.featureGroup());


  //MAP
  useEffect(() => {
    if (mapRef.current) {
    return;
  } 

    const map = L.map("leaflet-map", {
      center: [7.078987297874518, 125.5428209424999],
      zoom: 13,
      zoomControl: false,
    });

    //Starting MAP Layer
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

    // Add base OSM layer
    // new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   maxZoom: 19,
    // }).addTo(map);

    // Add marker
    // const marker = L.marker([7.078987297874518, 125.5428209424999]).addTo(map);
    // marker.bindPopup(`
    //   Center of the current MAP <br />.
    // `);
    
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
    }

    // Draw A Polygon
    if (props.geoJsonData ) {
      drawLayerRef.current.clearLayers();

        const geoJsonLayer = L.geoJSON(props.geoJsonData, {
        style: {
          color: "red",
          fillOpacity: 0.4,
        },
        onEachFeature: (feature, layer) => {
          layer.bindPopup("Drawn Polygon Test!!");
        }
      });

      let features = [];

      if (props.geoJsonData.type === "FeatureCollection") {
        features = props.geoJsonData.features;
      } else if (props.geoJsonData.type === "Feature") {
        features = [props.geoJsonData];
      } else {
        console.error("Invalid GeoJSON data format:", props.geoJsonData);
        return;
      }

      let coordinates = [];

      features.forEach((feature) => {
        const geom = feature.geometry;

        if (geom.type === "Polygon") {
          coordinates = coordinates.concat(geom.coordinates[0]);
        } else if (geom.type === "MultiPolygon") {
          geom.coordinates.forEach((poly) => {
            coordinates = coordinates.concat(poly[0]);
          });
        }
      });

      const centerCoordinate = calculateCenterCoordinates(coordinates);
      const centerLat = centerCoordinate[0];
      const centerLng = centerCoordinate[1];
      const centroidPlusCode = centerCoordinate[2];

      const popupContent = `
        <strong>Polygon Centroid:</strong><br />
        Latitude: ${centerLat.toFixed(6)}<br />
        Longitude: ${centerLng.toFixed(6)}<br />
        <br />
        Plus Code: ${centroidPlusCode}
      `;

      geoJsonLayer.bindPopup(popupContent);
      
      props.handlePlusCodes(centroidPlusCode);
      drawLayerRef.current.addLayer(geoJsonLayer);
      drawLayerRef.current.addTo(map);

      // Optional: auto-zoom to polygon bounds
      map.fitBounds(geoJsonLayer.getBounds());

      }

    var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
    const polygon = L.polygon(latlngs, {color: 'red'}).addTo(map)
    polygon.bindPopup("Sample Polygon")

    return () => {
      map.remove();
      mapRef.current = null;
    };

  }, [props.geoJsonData]);

  return (
    <section className="map-component">
      <div className='map' style={{ position: "relative" }}>
        <div id="leaflet-map" />
      </div>
    </section>
  );
};

export default LeafletMap;