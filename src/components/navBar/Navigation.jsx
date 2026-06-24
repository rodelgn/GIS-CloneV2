import { useState } from 'react'
import '../styles/navmenu.css';
import Swal from 'sweetalert2';


const Navigation = ( props ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [subMenuOpen, setSubMenuOpen] = useState(false);

    const navItems = [
        { key: 'plot', label: 'Plot Parcel', onClick: props.togglePlotting },
        { key: 'kml', label: 'Upload KML', onClick: props.toggleKML },
        { key: 'monuments', label: 'Monuments', onClick: props.toggleMonument },
        { key: 'users', label: 'Change Password', onClick: props.toggleUsersManagement },
    ];

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

    const handleNavClick = (onClick) => {
        onClick();
        setIsMenuOpen(false);
    };


  return (
        <nav className='navbar'>
            {isMenuOpen && (
                <button
                    type="button"
                    className="nav-scrim"
                    aria-label="Close navigation menu"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
            <div className='nav-header'>
            <div className='logo'>
                <span className="logo-mark">GIS</span>
                <span>Tax Map</span>
            </div>
            
                <button
                    type="button"
                    className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Open navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                {navItems.map((item) => (
                    <li key={item.key}>
                        <button
                            type="button"
                            className={`nav-action ${props.activePanel === item.key ? 'active' : ''}`}
                            onClick={() => handleNavClick(item.onClick)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
                <li><button type="button" className='btn-logout' onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    )
}

export default Navigation;
