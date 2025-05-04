import React, { useState } from 'react'
import './styles/plottingform.css';

const Plot = ( props ) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div className='plot-container'>
      <h1>Plot Parcel</h1>
      <form action="plot-form">
  
        <div className='form-group upload-group'>
          <label>Upload CSV File for Auto Fill</label>
          <input type="file" accept=".csv" required />
        </div>
  
        <div className="section">
          <h3 style={{ marginBottom: '1rem' }}>Plot Details</h3>
          <div className='two-column'>
            <div className="form-group">
              <label>Title No.</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Title Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" required />
            </div>
            <div className="form-group">
              <label>Survey No.</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Lot No.</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Blk No.</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Area (sq.m.)</label>
              <input type="text" style={{ width: '130px' }} required />
            </div>
          </div>
        </div>
  
        <div className='section'>
          <h3 style={{ marginBottom: '1rem' }}>Boundaries</h3>
  
          <div className='monument-row'>
            <div className='form-group'>
              <label>Monument</label>
              <input type="text" style={{ width: '150px' }} required/>
            </div>
            <div className='form-group'>
              <label>Easting</label>
              <input type="text" style={{ width: '150px' }} required/>
            </div>
            <div className='form-group'>
              <label>Northing</label>
              <input type="text" style={{ width: '150px' }} required/>
            </div>
          </div>

          <div className='form-group' style={{ marginBottom: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
              <label>Number of Points</label>
              <input type="text" style={{ width: '80px' }} />
            </div>
  
          <div className='form-group'>
            <label>Tie Line - 1*</label>
              <div className='tie-line-row'>
                <select>
                  <option value=""></option>
                  <option value="">N</option>
                  <option value="">S</option>
                </select>
                <input type="text" />
                <input type="text" />
                <select>
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
          <input type="text" />
        </div>
  
        <div className='form-buttons'>
          <button type='submit' className="btn-submit">Save</button>
          <button type="button" className="btn-cancel" onClick={props.onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Plot;