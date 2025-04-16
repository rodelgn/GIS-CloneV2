import React, { useState } from 'react'
import './styles/plottingform.css';

const Plot = ( props ) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div className='plot-container'>
      <h1>Plot Parcel</h1>
      <form action="" className='plot-form'>
        <label htmlFor="">Upload CSV File.</label>
        <input type="file" accept=".csv" required/>

        <label>Title No.</label>
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

        <div className='form-buttons'>
          <button type='submit' className="btn-submit">Save</button>
          <button type="button" className="btn-cancel" onClick={props.onClose}>Cancel</button>
        </div>
      </form>

    </div>
  )
}

export default Plot;