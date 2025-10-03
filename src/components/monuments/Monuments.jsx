import React from 'react'
import '../styles/monuments.css'
import Axios from '../../api/Axios'

const Monuments = (props) => {

    const fetchMonuments = async () => {
        try {
                const response = await Axios.get('/monumentData');
                console.log('Monuments data:', response.data);
            } catch (error) {
                console.error('Error fetching monuments:', error);
            }
    }

    const handleClose = () => {
        props.onClose();
    }



  return (
    <div  className="form-container">
        <h1>Monuments</h1>
        <table className='tableBody'>
            <thead>
                <tr>
                    <th>Monument</th>
                    <th>Easting</th>
                    <th>Northing</th>
                </tr>
            </thead>
        </table>

        <div className='btn-close-container'>
            <button type='button' className='btn-close' onClick={handleClose}>Close</button>
        </div>  
    </div>
  )
}

export default Monuments