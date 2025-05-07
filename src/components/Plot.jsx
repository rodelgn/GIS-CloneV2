import React, { useState } from 'react'
import './styles/plottingform.css';
import Swal from 'sweetalert2';
import Axios from '../api/Axios';

const Plot = ( props ) => {
  const [plotData, setPlotData] = useState({
    titleNo: '',
    owner: '',
    date: '',
    surveyNo: '',
    lotNo: '',
    blkNo: '',
    area: '',
    monument: '',
    easting: '',
    northing: '',
    pluscode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlotData({
      ...plotData,
      [name]: value
    });
    console.log(plotData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('/plottingData', {
        titleNo: plotData.titleNo,
        owner: plotData.owner,
        date: plotData.date,
        surveyNo: plotData.surveyNo,
        lotNo: plotData.lotNo,
        blkNo: plotData.blkNo,
        area: plotData.area,
        monument: plotData.monument,
        easting: plotData.easting,
        northing: plotData.northing,
        pluscode: plotData.pluscode
      });

      console.log(response.data);

      if (response.data.status === 'ok') {
        handleClose();

        Swal.fire({
          title: "Data saved successfully!",
          icon: "success",
          draggable: false
        })

      } else {
        Swal.fire({
          title: "Error saving plot data!",
          icon: "error",
          draggable: false
        })
      }
    } catch (error) {
      console.error('Error saving plot data:', error);
      alert('Error saving plot data. Please try again.');
    }
  };

  const handleClose = () => {
    props.onClose();
  }


  return (
    <div className='plot-container'>
      <h1>Plot Parcel</h1>

      <div className='form-group upload-group'>
          <label>Upload CSV File for Auto Fill</label>
          <input type="file" accept=".csv" />
        </div>

      <form onSubmit={handleSubmit} className='plot-form' >
        <div className="section">
          <h3 style={{ marginBottom: '1rem' }}>Plot Details</h3>
          <div className='two-column'>
            <div className="form-group">
              <label>Title No.</label>
              <input type="text" onChange={handleInputChange} name='titleNo' required />
            </div>
            <div className="form-group">
              <label>Owner</label>
              <input type="text" onChange={handleInputChange} name='owner' required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" onChange={handleInputChange} name='date' required />
            </div>
            <div className="form-group">
              <label>Survey No.</label>
              <input type="text" onChange={handleInputChange} name='surveyNo' required />
            </div>
            <div className="form-group">
              <label>Lot No.</label>
              <input type="text" onChange={handleInputChange} name='lotNo' required />
            </div>
            <div className="form-group">
              <label>Blk No.</label>
              <input type="text" onChange={handleInputChange} name='blkNo' required />
            </div>
            <div className="form-group">
              <label>Area (sq.m.)</label>
              <input type="text" style={{ width: '130px' }} onChange={handleInputChange} name='area' required />
            </div>
          </div>
        </div>
  
        <div className='section'>
          <h3 style={{ marginBottom: '1rem' }}>Boundaries</h3>
  
          <div className='monument-row'>
            <div className='form-group'>
              <label>Monument</label>
              <input type="text" style={{ width: '150px' }} onChange={handleInputChange} name='monument' required/>
            </div>
            <div className='form-group'>
              <label>Easting</label>
              <input type="text" style={{ width: '150px' }} onChange={handleInputChange} name='easting' required/>
            </div>
            <div className='form-group'>
              <label>Northing</label>
              <input type="text" style={{ width: '150px' }} onChange={handleInputChange} name='northing' required/>
            </div>
          </div>

          <div className='form-group' style={{ marginBottom: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
              <label>Number of Points</label>
              <input type="text" style={{ width: '80px' }} />
            </div>
  
          <div className='form-group'>
            <label>Tie Line - 1*</label>
              <div className='tie-line-row'>
                <select placeholder="N/S">
                  <option value=""></option>
                  <option value="">N</option>
                  <option value="">S</option>
                </select>
                <input type="text" />
                <input type="text" />
                <select placeholder="E/W">
                  <option value=""></option>
                  <option value="">E</option>
                  <option value="">W</option>
                </select>
                <input type="text" placeholder="DISTANCE" />
                <button className='remove-btn'>x</button>
              </div>
              <div className='btnDraw-ctn'>
                <button className='btn-draw'>Draw</button>
              </div>
          </div>
        </div>

        <div className="form-group">
          <label>Plus Code</label>
          <input type="text" onChange={handleInputChange} name='pluscode' />
        </div>
  
        <div className='form-buttons'>
          <button type='submit' className="btn-submit">Save</button>
          <button type="button" className="btn-cancel" onClick={handleClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Plot;