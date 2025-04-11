import React from 'react'
import './styles/navmenu.css';


const Navigation = ( props ) => {

    const handleLogout = () => {
        props.logoutClick();
        alert('Successfully logged out!');
    }

  return (
    <nav className='navbar'>
        <div className='logo'>GIS TAX MAP</div>
        <ul className='nav-links'>
            <li><a href="#">Home</a></li>
            <li><a href="#">Map</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><button className='btn-logout' onClick={handleLogout}>Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navigation