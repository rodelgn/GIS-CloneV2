import proj4 from "proj4"


proj4.defs(
  "EPSG:3125",
  "+proj=tmerc +lat_0=0 +lon_0=125 +k=0.99995 +x_0=500000 +y_0=0 +ellps=clrk66 +towgs84=-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06 +units=m +no_defs +type=crs"
);

const DrawPolygon = () => {
  return (
    <div>
        <button className='btn-draw' onClick={() => {props.onDraw(JSON.stringify(tieLineParseCoordinates, null, 2))}}>Draw</button>
    </div>
  )
}

export default DrawPolygon