import React, { useState } from 'react'
import './styles/plottingform.css';

const Plot = ( props ) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div className='plot-container'>
      <h1>Plot Parcel</h1>
      <form action="plot-form" >
          <div className='uploadWrapper'>
            <label htmlFor="">Upload CSV File for Auto Fill</label>
            <input type="file" accept=".csv" required/>
          </div>

        <div className='plot-data'>
          <label>Title No.</label>
          <input type="text" required/>
          <label>Title Name</label>
          <input type="text" required/>
          <label>Date</label>
          <input type="date" required/>
          <label>Survey No.</label>
          <input type="text" required/>
          <label htmlFor="">Lot No.</label>
          <input type="text" required/>
          <label htmlFor="">Blk No.</label>
          <input type="text" required/>
          <label>Area (sq.m.)</label>
          <input type="text" required/>
        </div>

        <div className='boundaries-cntnr'>
        <h4>Boundaries</h4>
        <br/>

          <div className='plot-monument'>
            <label>Monument</label>
            <input type="text" />

            <label>Easting</label>
            <input type="text" />

            <label>Northing</label>
            <input type="text" />
          </div>

          <div className=''>
            <div style={{ display: 'flex', gap: '10px' }}>
            <p>Number of Points</p>
            <input style={{ width: '55px', borderRadius: '8px' }} type="text" name="" id="" />
            </div>

            <div className='plot-monument'>
            <label>Tie Line - 1</label>
            <select name="" id=""></select>
            <input type="text" />
            <input type="text" />
            <select name="" id=""></select>
            <input type="text" placeholder='Distance' />
            </div>

            <div className='btnDraw-ctn'>
            <button type='submit' className='btn-draw'>Draw</button>
            </div>
          </div>
        </div>

        <label htmlFor="">Plus Code</label>
        <input type="text" />

        <div className='form-buttons'>
          <button type='submit' className="btn-submit">Save</button>
          <button type="button" className="btn-cancel" onClick={props.onClose}>Cancel</button>
        </div>
      </form>

    </div>
  )
}

export default Plot;