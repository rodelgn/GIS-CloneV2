import { useState } from 'react';
import '../components/styles/plottingform.css';
import '../components/styles/formContainer.css';


const Kml = (props) => {
    const [tableRows, setTableRows] = useState([]);

    const handleKmlUpload = (e) => {
        const file = e.target.files[0];
    }

    const handleClose = () => {
    props.onClose();
  }

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