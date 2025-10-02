import React from 'react'
import '../styles/monuments.css'
import Axios from '../../api/Axios'

const Monuments = () => {

    const fetchMonuments = async () => {
        try {
                const response = await Axios.get('/monumentData');
                console.log('Monuments data:', response.data);
            } catch (error) {
                console.error('Error fetching monuments:', error);
            }
    }



  return (
    <div  className="form-container">
        <h1>Monuments</h1>
        <table>
            <thead>
                <tr>
                    <th>Monument</th>
                    <th>Easting</th>
                    <th>Northing</th>
                </tr>
            </thead>
        </table>

        
        
    </div>
  )
}

export default Monuments