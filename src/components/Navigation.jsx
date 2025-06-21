import { useState } from 'react'
import './styles/navmenu.css';
import Swal from 'sweetalert2';


const Navigation = ( props ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [subMenuOpen, setSubMenuOpen] = useState(false);

    const handleLogout = () => {
        props.logoutClick();
        Swal.fire({
            title: "Successfully logged out!",
            icon: "success",
            draggable: false
        });
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handlePlotclick = () => {
        props.togglePlotting();
        setIsMenuOpen(false);
    };

    const handleKmlClick = () => {
        props.toggleKML();
        setIsMenuOpen(false);
    }


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
                <li><a onClick={handlePlotclick}>Plot Parcel</a></li>
                <li><a onClick={handleKmlClick}>Upload KML</a></li>
                <li><a href="#">User</a></li>
                <li><a href="#">Change Password</a></li>
                <li><button className='btn-logout' onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    )
}

export default Navigation;