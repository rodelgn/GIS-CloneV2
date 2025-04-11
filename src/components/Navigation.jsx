import React, { useState } from 'react'
import './styles/navmenu.css';


const Navigation = ( props ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        props.logoutClick();
        alert('Successfully logged out!');
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


  return (
        <nav className='navbar'>
            <div className='nav-header'>
            <div className='logo'>GIS TAX MAP</div>
            
                <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
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