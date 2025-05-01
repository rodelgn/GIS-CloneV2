import React, { useState } from 'react'
import './styles/plottingform.css';

const Plot = ( props ) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div className='plot-container'>
      <h1>Plot Parcel</h1>
      <form action="" className='plot-form'>
        <label htmlFor="">Upload CSV File.</label>
        <input type="file" accept=".csv" required/>

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

        <div>
        <label>Boundaries:</label>
        <br/>
          <div>
            <label>Monument</label>
            <input type="text" />

            <label>Easting</label>
            <input type="text" />

            <label htmlFor="">Northing</label>
            <input type="text" />
          </div>

          <div>
            <p>Number of Points</p>
            <input type="text" name="" id="" />

            <label htmlFor="">Tie Line - 1</label>
            <select name="" id=""></select>
            <input type="text" />
            <input type="text" />
            <select name="" id=""></select>
            <input type="text" placeholder='Distance' />
          </div>
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