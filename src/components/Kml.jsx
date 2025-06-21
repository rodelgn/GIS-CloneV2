import React from 'react';
import '../components/styles/plottingform.css';
import '../components/styles/formContainer.css';


const Kml = (props) => {

    const handleClose = () => {
    props.onClose();
  }

    return (
        <div className='form-container'>
            <div className='form-group upload-group'>
                <label htmlFor="">Upload KML File.</label>
                <input type="file" accept=".csv" />
            </div>

            <div className='form-buttons' style={{ width: '50%' }}>
            <button type='submit'>Save</button>
            <button type="button" onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Kml;