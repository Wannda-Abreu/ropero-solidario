import { useState } from 'react';
import { Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faChevronDown, faCog} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./AdminSidebar.css";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  const handleToggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className={`sidebar-container  ${menuOpen ? 'sidebar-expanded' : ''}`}>
      <button className="toggle-btn mt-2" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <Nav defaultActiveKey="/home" className={`sidebar-menu mt-1 ${menuOpen ? 'show' : 'hide'}`}>
        <Nav.Link as={Link} to="/dashboard" className='text-white mt-2'>Panel</Nav.Link>
        <Nav.Link as={Link} to="/users" className='text-white mt-2'>Usuarios</Nav.Link>
        <Nav.Link as={Link} to="/settings" className='text-white mt-2'>
          <FontAwesomeIcon icon={faCog} /> Ajustes
        </Nav.Link>
        {isLoggedIn ? (
          <Nav.Link className='logout-icon text-white ' onClick={handleToggleLogin}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Nav.Link>
        ) : (
          <Nav.Link className='text-white login-icon' onClick={handleToggleLogin}>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
