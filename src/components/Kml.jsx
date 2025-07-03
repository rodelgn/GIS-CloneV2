import { useState } from 'react';
import '../components/styles/formContainer.css';
import '../components/styles/kml.css';
import toGeoJSON from 'togeojson';


const Kml = (props) => {
    const [tableRows, setTableRows] = useState([]);
    const [extractedData, setExtractedData] = useState(null)
    const [extractedCoordinates, setExtractedCoordinates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleKmlUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const kmlData = event.target.result;
                    const convertedGeoJSON = toGeoJSON.kml(new DOMParser().parseFromString(kmlData, 'text/html'));
                    props.onKMLUpload(convertedGeoJSON);

                    const { extractedData, extractedCoord, headerNames } = extractedKMLData(kmlData);
                    setExtractedData(extractedData);
                    setExtractedCoordinates(extractedCoord);
                    const rows = generateTableRows(extractedData, headerNames);
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
            const simpleDataNodes = simpleDataNodeList[index].querySelectorAll('SimpleData');

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

    const generateTableRows = (data, headerNames) => {
        const displayHeaders = ['title_no', 't_date', 'surv_no', 'lot_no', 'blk_no', 'area', 'owner' ];

        const filteredHeaderNames = headerNames.filter(name => displayHeaders.includes(name));

        const headerRow = filteredHeaderNames.map(name => 
            <th key={name}>{name.toUpperCase()}</th>
        );

        const bodyRows = data.map((item, i) => {
            return (

            <tr key={i}>{filteredHeaderNames.map(name => (
                <td key={name}>{item.SimpleData[name] ? item.SimpleData[name].toUpperCase() : ''}</td>
            ))}
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
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    const handleSaveData = (e) => {
        e.preventDefault();
    }

    return (
        <div className='form-container'>
            <div className='form-group upload-group'>
                <label htmlFor="">Upload KML File.</label>
                <input type="file" name="kmlFile" accept=".kml" onChange={handleKmlUpload} />
            </div>

            <div className='form-buttons' style={{ width: '50%' }}>
            <button type='submit'>Save</button>
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