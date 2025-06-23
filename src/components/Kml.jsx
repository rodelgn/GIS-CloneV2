import { useState } from 'react';
import '../components/styles/plottingform.css';
import '../components/styles/formContainer.css';
import toGeoJSON from 'togeojson';


const Kml = (props) => {
    const [tableRows, setTableRows] = useState([]);
    const [extractedData, setExtractedData] = useState(null)
    const [extractedCoordinates, setExtractedCoordinates] = useState([]);

    const generateTableRows = (data, headerNames) => {
        const displayHeaders = ['title_no', 't_date', 'surv_no', 'lot_no', 'blk_no', 'area', 'boundary', 'owner' ];

        const filteredHeaderNames = headerNames.filter(name => displayHeaders.includes(name));

        const headerRow = filteredHeaderNames.map(name => <th key={name}>{name.toUpperCase()}</th>);
        const bodyRows = data.map((item, i) => {
            <tr key={i}>{filteredHeaderNames.map(name => (
                <td key={name}>{item.SimpleData[name] ? item.SimpleData[name].toUpperCase() : ''}</td>
            ))}</tr>
        });

        return [headerRow, ...bodyRows];
    };

    const handleKmlUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const kmlData = event.target.result;
                    const convertedGeoJSON = toGeoJSON.kml(new DOMParser().parseFromString(kmlData, 'text/html'));
                    props.onKMLUpload(convertedGeoJSON);

                    const { extractedData, extractedCoordinates, headerNames } = extractedKMLData(kmlData);
                    setExtractedData(extractedData);
                    setExtractedCoordinates(extractedCoordinates);
                    const rows = generateTableRows(extractedData, headerNames);
                    setTableRows(rows);

                } catch (err) {
                    console.error("Error processing KML data: ", err)
                }
            };
            
            reader.readAsText(file);
        }
    };

    const handleClose = () => {
        props.onClose();
    };

    return (
        <div className='form-container'>
            <div className='form-group upload-group'>
                <label htmlFor="">Upload KML File.</label>
                <input type="file" name="kmlFile" accept=".kml" />
            </div>

            <div className='form-buttons' style={{ width: '50%' }}>
            <button type='submit'>Save</button>
            <button type="button" onClick={handleClose}>Cancel</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
};

export default Kml;