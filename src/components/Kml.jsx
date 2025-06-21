import React from 'react';
import '../components/styles/plottingform.css';


const Kml = () => {

    return (
        <div className='form-container'>
            <div className='form-group upload-group'>
                <label htmlFor="">Upload KML File.</label>
                <input type="file" accept=".csv" />
            </div>
        </div>
    );
};

export default Kml;