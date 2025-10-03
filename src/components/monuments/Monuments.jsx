import {useEffect, useState} from 'react'
import '../styles/monuments.css'
import Axios from '../../api/Axios'

const Monuments = (props) => {
    const [monuments, setMonuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

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

    const totalPages = Math.ceil(monuments.length / rowsPerPage);
    const currentRows = monuments.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


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
                {currentRows.map((index) => (
                    <tr key={index.id}>
                        <td>{index.monument}</td>
                        <td>{index.easting}</td>
                        <td>{index.northing}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className='pagination'>
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Previous
            </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                  Next
            </button>
        </div>

        <div className='btn-close-container'>
            <button type='button' className='btn-close' onClick={handleClose}>Close</button>
        </div>  
    </div>
  )
};

export default Monuments;