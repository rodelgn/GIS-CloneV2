import React from 'react'
import './styles/plottingform.css';

const Plot = () => {
  return (
    <div className='plot-container'>

      <form action="">
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

        <button>Save</button>

        </form>

    </div>
  )
}

export default Plot;