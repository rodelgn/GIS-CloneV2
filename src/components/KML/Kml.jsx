import { useState, useEffect } from 'react';
import '../../components/styles/formContainer.css';
import '../../components/styles/kml.css';
import toGeoJSON from 'togeojson';
import Axios from '../../api/Axios';
import Swal from 'sweetalert2';


const Kml = (props) => {
    const [tableRows, setTableRows] = useState([]);
    const [extractedData, setExtractedData] = useState([])
    const [extractedCoordinates, setExtractedCoordinates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        if (extractedData.length > 0) {
          const headerNames = Object.keys(extractedData[0].SimpleData || {});
          const rows = generateTableRows(extractedData, headerNames, props.kmlPluscode);
          setTableRows(rows);
        }
    }, [props.kmlPluscode, extractedData]);

    const handleKmlUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const kmlData = event.target.result;
                    const convertedGeoJSON = toGeoJSON.kml(new DOMParser().parseFromString(kmlData, 'text/html'));
                    props.onKMLUpload(convertedGeoJSON);

                    const { extractedData, extractedKmlCoordinates, headerNames } = extractedKMLData(kmlData);
                    setExtractedData(extractedData);
                    setExtractedCoordinates(extractedKmlCoordinates);
                    const rows = generateTableRows(extractedData, headerNames, props.kmlPluscode);
                    setTableRows(rows);

                } catch (err) {
                    console.error("Error processing KML data: ", err)
                }
            };
            
            reader.readAsText(file);
        }
    };

    const extractedKMLData = (kmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(kmlData, 'text/html');
        const coordinatesNodes = xmlDoc.querySelectorAll('coordinates');
        const simpleDataNodeList = xmlDoc.querySelectorAll('Placemark');
        const extractedData = [];
        const headerNames = new Set();
        const extractedKmlCoordinates = [];

        coordinatesNodes.forEach((coordinatesNode, index) => {
            const simpleDataElement  = simpleDataNodeList[index];
             if (!simpleDataElement) return;

             const simpleDataNodes = simpleDataElement.querySelectorAll('SimpleData');

            const data = {
                coordinates: coordinatesNode ? coordinatesNode.textContent : '',
                SimpleData: {}
            };

            const coords = coordinatesNode ? coordinatesNode.textContent.split(' ') : [];
            extractedKmlCoordinates.push(coords);

            simpleDataNodes.forEach((node) => {
                const name = node.getAttribute('name');
                const value = node.textContent;
                data.SimpleData[name] = value;
                headerNames.add(name);
            });

            const area = parseFloat(data.SimpleData['area']).toFixed(2);
            data.SimpleData['area'] = area;

            extractedData.push(data);
        });

        return { extractedData, extractedKmlCoordinates, headerNames: Array.from(headerNames) };
    };

    const generateTableRows = (data, headerNames, kmlPluscode) => {
        const displayHeaders = ['title_no', 't_date', 'surv_no', 'lot_no', 'blk_no', 'area', 'owner' ];

        const filteredHeaderNames = headerNames.filter(name => 
            displayHeaders.includes(name)
        );

        const headerRow = [
            ...filteredHeaderNames.map((name) => (
              <th key={name}>{name.toUpperCase()}</th>
            )),
            <th key="pluscode">PLUSCODE</th>,
        ];

        const bodyRows = data.map((item, i) => {
            return (

            <tr key={i}>
                {filteredHeaderNames.map((name) => (
                  <td key={name}>
                    {item.SimpleData[name] ? item.SimpleData[name].toUpperCase() : ""}
                  </td>
                ))}
                    <td>{kmlPluscode?.[i] || "N/A"}</td>
            </tr>

        )});

        return [headerRow, bodyRows];
    };

    const handleClose = () => {
        props.onClose();
    };

    //Pagination logic
    const totalPages = tableRows[1] ? Math.ceil(tableRows[1].length / rowsPerPage) : 0;
    const currentRows = tableRows[1] ? tableRows[1].slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : [];

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    //end 
    
    const handleSaveData = async (e) => {
        e.preventDefault();

        if (!extractedData || !extractedCoordinates.length) {
            Swal.fire({
                title: 'Error',
                text: 'No KML data to save. Please upload a valid KML file.',
                icon: 'error',
            });
            return;
        };

        
         if (extractedData.length > 0 && extractedCoordinates.length > 0) {
            for (let r = 0; r < extractedData.length; r++) {
                const placemarkData = extractedData[r];
                const placemarkCoordinates = extractedCoordinates[r];
                
                const filterCoordinates = placemarkCoordinates.filter(item => item.trim() !== '');

                const coordinatedPairs = filterCoordinates.map(pair => {
                    const [lng, lat] = pair.split(',').map(Number);
                    return [ lng, lat ];
                });

                if (coordinatedPairs.length > 2) {
                    const first = coordinatedPairs[0];
                    const last = coordinatedPairs[coordinatedPairs.length - 1];
                    if (first[0] !== last[0] || first[1] !== last[1]) {
                        coordinatedPairs.push(first);
                    }
                }

                const geometry = {
                    type: 'Polygon',
                    coordinates: [coordinatedPairs]
                }

                const {
                    title_no,
                    t_date,
                    surv_no,
                    lot_no,
                    blk_no,
                    area,
                    owner,
                } = placemarkData.SimpleData;

                const dataToSave = {
                    titleNo: title_no || '',
                    date: t_date || '',
                    surveyNo: surv_no || '',
                    lotNo: lot_no || '',
                    blkNo: blk_no || '',
                    area: area || '',
                    owner: owner || '',
                    geojson: geometry,
                    pluscode: props.kmlPluscode[r] || "",
                };

                await Axios.post('/plottingData', dataToSave);
            }
         } else {
            alert('No data to save. Please ensure the KML file contains valid data.');
         }
         
    };

    return (
        <div className='form-container'>
            <div className='form-group upload-group'>
                <label htmlFor="">Upload KML File.</label>
                <input type="file" name="kmlFile" accept=".kml" onChange={handleKmlUpload} />
            </div>

            <div className='form-buttons' style={{ width: '50%' }}>
            <button type="submit" onClick={handleSaveData}>Save</button>
            <button type="button" onClick={handleClose}>Cancel</button>
            </div>

            <div className='table-container'>
                <table className='tableBody'>
                    <thead>
                        <tr>{tableRows[0]}</tr>
                    </thead>
                    <tbody>{currentRows}</tbody>
                </table>

                {tableRows[1] && tableRows[1].length > rowsPerPage && (
                    <div className="pagination-controls">
                        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Kml;