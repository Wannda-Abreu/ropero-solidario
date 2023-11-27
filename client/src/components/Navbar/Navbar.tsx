import { useState } from "react";
import { Link } from "react-router-dom";
import logotype from "../../assets/Logos/white-logo.png";
import GoogleTranslate from "../../components/GoogleTranslate/GoogleTransalate";
import "./Navbar.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav aria-label="Navbar" className="navbar-container">
      <div className="menu-section">
        <Link to="/">
          <img
            src={logotype}
            aria-label="logotype"
            className="logotype-img"
            alt="Image of logotype"
          />
        </Link>
        <div className="right-container">
          <main className="links-container">
            <ul className="ul-container">
              <Link to="/" className="navbar-li" aria-label="home">
                Ropero solidario
              </Link>
              <Link to="/userappointments" className="navbar-li" aria-label="aboutus">
                Gestionar cita
              </Link>
              <Link to="/contact" className="navbar-li" aria-label="contact">
                Contacto
              </Link>
            </ul>
          </main>
          <GoogleTranslate />
          <div className="mobile-menu">
            <button
              onClick={toggleDropdown}
              className="mobile-menu-button"
              aria-label="menu"
            >
              {showDropdown ? (
                <div className="close-icon">
                  <div className="line-horizontal"></div>
                  <div className="line-vertical"></div>
                </div>
              ) : (
                "☰"
              )}
            </button>
            <ul className={`mobile-dropdown ${showDropdown ? "show" : ""}`}>
              <li>
                <Link to="/" className="navbar-li" aria-label="home">
                  Ropero solidario
                </Link>
              </li>
              <li>
                <Link to="/newuser" aria-label="info">
                  Información adicional
                </Link>
              </li>
              <li>
                <Link to="/contact" aria-label="contact">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
