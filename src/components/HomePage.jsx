import React from 'react'
import Navigation from './Navigation';

const HomePage = ( props ) => {
  return (
    <div>
        <Navigation 
         logoutClick = {props.onLogout}
         />

        <h1>Welcome Home Page!</h1>
    </div>
  )
}

export default HomePage