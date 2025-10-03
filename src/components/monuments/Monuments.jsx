import {useEffect, useState} from 'react'
import '../styles/monuments.css'
import Axios from '../../api/Axios'

const Monuments = (props) => {
    const [monumets, setMonuments] = useState([]);

    useEffect(() => {
        Axios.get('/monumentData')
            .then((response) => {
                setMonuments(response.data);
                console.log("Monuments Data: ", response.data)
            }).catch((error) => {
                console.error("Error fetching monuments data: ", error);
            
            });
    }, []);

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
            <tbody>
                {monumets.map((index) => (
                    <tr key={index.id}>
                        <td>{index.monument}</td>
                        <td>{index.easting}</td>
                        <td>{index.northing}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className='btn-close-container'>
            <button type='button' className='btn-close' onClick={handleClose}>Close</button>
        </div>  
    </div>
  )
};

export default Monuments;