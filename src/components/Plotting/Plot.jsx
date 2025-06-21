import { useEffect, useState } from 'react'
import '../styles/plottingform.css';
import '../components/styles/formContainer.css';
import Swal from 'sweetalert2';
import Axios from '../../api/Axios';
import DrawPolygon from './DrawPolygon';
import { usePolygonCoordinates } from '../hooks/usePolygonCoordinates';

const Plot = ( props ) => {
  const { polygonCoordinates } = usePolygonCoordinates();
  const [numberOfPoints, setNumberOfPoints] = useState("");
  const [results, setResults] = useState([]);
  const [plotData, setPlotData] = useState({
    titleNo: '',
    owner: '',
    date: '',
    surveyNo: '',
    lotNo: '',
    blkNo: '',
    area: '',
    plusCode: props.plusCode
  });
  const createTieLine = () => {
    return {
      degreeAngle: '',
      degree: '',
      minutes: '',
      minutesAngle: '',
      distance: '',
    };
  };
  const [polygonLayer, setPolygonLayer] = useState({
    monument: '',
    easting: '',
    northing: '',
    tieLines: [createTieLine()]
  });

  useEffect(() => {
    handleAddTieLine();
   }, [numberOfPoints]);

   useEffect(() => {
    handleCalculateCoordinates();
  }, [polygonLayer, results])

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'easting' || name === 'northing' || name === 'monument') {
      setPolygonLayer({
        ...polygonLayer,
        [name]: value
      });
    } else {
      setPlotData({
        ...plotData,
        [name]: value
      });
    }
  };

  // Add Tie Line Handler
  const handleAddTieLine = () => {
    const numOfPoints = parseInt(numberOfPoints) + 1;
    
    if (!isNaN(numOfPoints) && numOfPoints > 0 ) {
      const currentTieLines = polygonLayer.tieLines;
      const newTieLines = Array(numOfPoints).fill().map((_, index) => {
        const newIndex = index + currentTieLines.length + 1;
        return createTieLine(newIndex);
      });

      for (let i = 0; i < Math.min(numOfPoints, currentTieLines.length); i++) {
        newTieLines[i] = {...currentTieLines[i]}
      }

      setPolygonLayer({
        ...polygonLayer,
        tieLines: newTieLines,
      })
    }
  };

  // Handle Tie Line Change
  const handleTieLineChange = (index, field, value) => {
    const updated = [...polygonLayer.tieLines];
    updated[index] = { ...updated[index], [field]: value };
    setPolygonLayer({ ...polygonLayer, tieLines: updated });
  };

  const decimalBearingCalculation = (degree, minutes) => {
    return parseFloat(degree) + (parseFloat(minutes) / 60);
  };

  //c14=degreeAngle, d14=degree, e14=minutes, f14=minutesAngle
  const azimuthCalculation = (degreeAngle, degree, minutes, minutesAngle  ) => {

    const decimalBearing = decimalBearingCalculation(degree, minutes);
    let calculatedCoordinates;

    if (degreeAngle === 'N' && minutesAngle === 'E') {
      calculatedCoordinates = decimalBearing + 180;
    } else if (degreeAngle === 'S' && minutesAngle === 'E') {
      calculatedCoordinates = decimalBearing * -1 + 360;
    } else if (degreeAngle === 'S' && minutesAngle === 'W') {
      calculatedCoordinates = decimalBearing;
    } else if (degreeAngle === 'N' && minutesAngle === 'W') {
      calculatedCoordinates = decimalBearing * -1 + 180;
    } else {
      calculatedCoordinates = "";
    }
    return calculatedCoordinates;
  };

  const handleCalculateCoordinates = () => {
    let cumulativeEasting = parseFloat(polygonLayer.easting);
    let cumulativeNorthing = parseFloat(polygonLayer.northing);

    const tieLinesArray = polygonLayer.tieLines.map((tieLine) => {
      const azimuth = azimuthCalculation(tieLine.degreeAngle, tieLine.degree, tieLine.minutes, tieLine.minutesAngle);
      const sine = parseFloat(tieLine.distance) * Math.sin(azimuth * (Math.PI / 180)) * -1;
      const cosine = parseFloat(tieLine.distance) * Math.cos(azimuth * (Math.PI / 180)) * -1;
      const eastingCoordinate = cumulativeEasting + sine;
      cumulativeEasting = eastingCoordinate;
      const northingCoordinate = cumulativeNorthing + cosine;
      cumulativeNorthing = northingCoordinate;

      return {eastingCoordinate, northingCoordinate};
    });

    const formattedResults = tieLinesArray.map(coord => `${coord.eastingCoordinate}, ${coord.northingCoordinate}`).join('\n');
    setResults(formattedResults);
    console.log("Formatted Result: ", formattedResults);
  };

  const handleRemoveTieLine = (index) => {
    const updatedTieLines = polygonLayer.tieLines.filter((_, i) => i !== index);
    setPolygonLayer({
      ...polygonLayer,
      tieLines: updatedTieLines,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const geometry = {
        type: "Polygon",
        coordinates: [polygonCoordinates]
      
    };

    try {
      const response = await Axios.post('/plottingData', {
        titleNo: plotData.titleNo,
        owner: plotData.owner,
        date: plotData.date,
        surveyNo: plotData.surveyNo,
        lotNo: plotData.lotNo,
        blkNo: plotData.blkNo,
        area: plotData.area,
        monument: polygonLayer.monument,
        easting: polygonLayer.easting,
        northing: polygonLayer.northing,
        geojson: JSON.stringify(geometry),
        pluscode: props.plusCode
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
    <div className='form-container'>
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
              <input type="text" onChange={handleInputChange} name='titleNo' placeholder='Title Number' required />
            </div>
            <div className="form-group">
              <label>Owner</label>
              <input type="text" onChange={handleInputChange} name='owner' placeholder='Owner' required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" onChange={handleInputChange} name='date' placeholder='Date' required />
            </div>
            <div className="form-group">
              <label>Survey No.</label>
              <input type="text" onChange={handleInputChange} name='surveyNo' placeholder='Survey Number' required />
            </div>
            <div className="form-group">
              <label>Lot No.</label>
              <input type="text" onChange={handleInputChange} name='lotNo' placeholder='Lot Number' required />
            </div>
            <div className="form-group">
              <label>Blk No.</label>
              <input type="text" onChange={handleInputChange} name='blkNo' placeholder='Block Number' required />
            </div>
            <div className="form-group">
              <label>Area (sq.m.)</label>
              <input type="text" style={{ width: '130px' }} onChange={handleInputChange} name='area' placeholder='Lot Area (sqm)' required />
            </div>
          </div>
        </div>
      </form>
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
              <input type="text" style={{ width: '80px' }} name='numberOfPoints' value={numberOfPoints} onSelect={handleAddTieLine} onChange={(e) => setNumberOfPoints(e.target.value)} />
            </div>

        {polygonLayer.tieLines.map((tieLine, i) =>
          <div key={i} className='form-group'>
            <label>{i === 0 ? 'Tie Line - 1*' : i === polygonLayer.tieLines.length - 1 ? `Point ${i} - Origin*` : `Point ${i} - ${i + 1}*`} </label>

              <div className='tie-line-row' style={{ marginBottom: '1rem' }}>
                <select name='degreeAngle' value={tieLine.degreeAngle} onChange={e => handleTieLineChange(i, 'degreeAngle', e.target.value)} required>
                  <option value=''></option>
                  <option value="N">N</option>
                  <option value="S">S</option>
                </select>

                <input type="text" name='degree' value={tieLine.degree} onChange={e => handleTieLineChange(i, 'degree', e.target.value)} required/>
                <input type="text" name='minutes' value={tieLine.minutes} onChange={e => handleTieLineChange(i, 'minutes', e.target.value)} required/>

                <select name='minutesAngle' value={tieLine.minutesAngle} onChange={e => handleTieLineChange(i, 'minutesAngle', e.target.value)} required>
                  <option value=''></option>
                  <option value="E">E</option>
                  <option value="W">W</option>
                </select>

                <input type="text" placeholder="D" name='distance' value={tieLine.distance} onChange={e => handleTieLineChange(i, 'distance', e.target.value)} required/>
                
                <button className='remove-btn' onClick={() => handleRemoveTieLine(i)}>x</button>
              </div>
          </div>
          )}
          <div className='btnDraw-ctn'>
                <DrawPolygon results={results}/>
              </div>
        </div>

        <div className="form-group">
          <label>Plus Code</label>
          <input type="text" value={props.plusCode} name='plusCode' readOnly/>
        </div>
  
        <div className='form-buttons'>
          <button type='submit' className="btn-submit" onClick={handleSubmit}>Save</button>
          <button type="button" className="btn-cancel" onClick={handleClose}>Cancel</button>
        </div>
      
    </div>
  )
}

export default Plot;