import React from 'react'

const Plot = () => {
  return (
    <div>
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

    </div>
  )
}

export default Plot