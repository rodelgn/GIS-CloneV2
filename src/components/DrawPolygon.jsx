import './styles/plottingform.css';
import {useState, useEffect} from 'react'
import { usePolygonCoordinates } from './hooks/usePolygonCoordinates';
import proj4 from "proj4"
import Swal from "sweetalert2";


proj4.defs(
  "EPSG:3125",
  "+proj=tmerc +lat_0=0 +lon_0=125 +k=0.99995 +x_0=500000 +y_0=0 +ellps=clrk66 +towgs84=-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06 +units=m +no_defs +type=crs"
);

const DrawPolygon = ({ results }) => {
    const { setPolygonCoordinates } = usePolygonCoordinates();
    const [parseCoordinates, setParseCoordinates] = useState([]);

    const handleConvert = () => {
        if (typeof results !== "string") {
            return;
        }

        const inputLines = results.split('\n').map(line => line.trim());
        const newCoordinates = [];

        try {
            inputLines.forEach(line => {
                const [x, y] = line.split(',').map(Number);

                if (!isFinite(x) || !isFinite(y)) {
                    throw new Error (`Invalid corrdinate: ${line}`);
                }

                const converted = proj4("EPSG: 3125", "EPSG: 4326", [x, y]);
                newCoordinates.push(converted);
            });

            setParseCoordinates(newCoordinates);
            console.log(newCoordinates);

        } catch (error) {
            console.log("Error converting coordinates: ", error);
        }
    };

    useEffect (() => {
        handleConvert();
    }, [results])

    const handleDraw = () => {
        const coordinates = (JSON.stringify(parseCoordinates, null, 2));

        try {
            const parsedCoordinates = JSON.parse(coordinates);

            if (Array.isArray(parsedCoordinates) && parsedCoordinates.length >= 3) {
                setPolygonCoordinates(parsedCoordinates);
            } else {
                Swal.fire({
                    title: "Please enter valid coordinates.",
                    icon: "error",
                    draggable: false
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Please enter valid coordinates.",
                icon: "error",
                draggable: false
            });
        }
    };


  return (
    <div>
        <button className='btn-draw' style={{ width: '100%'}} onClick={handleDraw}>Draw</button>
    </div>
  )
}

export default DrawPolygon