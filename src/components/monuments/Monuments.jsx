import React from 'react'
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
    <div>
        <h1>Monuments</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
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