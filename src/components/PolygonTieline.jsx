import React from 'react'

const PolygonTieline = () => {
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
      
  return (
    <div>PolygonTieline</div>
  )
}

export default PolygonTieline