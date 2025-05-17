import React, { useEffect, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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

const LeafletMap = () => {
  const mapRef = useRef(null);
  const drawLayerRef = useRef(L.featureGroup());


  //MAP
  useEffect(() => {
    const map = new Map(document.getElementById("leaflet-map"), {
      center: [7.078987297874518, 125.5428209424999],
      zoom: 13,
      zoomControl: false,
    });

    //Starting MAP Layer
    const openStreetMap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    )

    const eriSatteliteMap = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    const googleHybrid = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      {
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    )

    const googleSatteliteMap = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    const googleTerrainMap = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      {
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    const googleStreetMap = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 22,
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
    new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 21,
    }).addTo(map);

    // Add marker
    const marker = L.marker([7.078987297874518, 125.5428209424999]).addTo(map);
    marker.bindPopup(`
      A pretty CSS3 popup. <br /> Easily customizable.
    `);

    // Draw A Polygon

    if (props.polygonCoordinates.length > 0 ) {
      drawLayerRef.current.clearLayers();
    }
    var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
    const polygon = L.polygon(latlngs, {color: 'red'}).addTo(map)
    polygon.bindPopup("Sample Polygon")

    return () => {
      map.remove();
    };

  }, []);

  return (
    <section className="map-component">
      <div className='map' style={{ position: "relative" }}>
        <div id="leaflet-map" />
      </div>
    </section>
  );
};

export default LeafletMap;