import { useState } from "react";
import logotype from "../Logos/white-logo.png";
import loginIcon from "../Icons/login-icon.png";
import "./Navbar.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav aria-label="Navbar" className="navbar-container">
      <a href="/">
        <img
          src={logotype}
          aria-label="logotype"
          className="logotype-img"
          alt="Image of logotype"
        />
      </a>
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
            <a href="/" aria-label="home">
              Ropero solidario
            </a>
          </li>
          <li>
            <a href="/aboutus" aria-label="aboutus">
              Información adicional
            </a>
          </li>
          <li>
            <a href="/contact" aria-label="contact">
              Contacto
            </a>
          </li>
          <li>
            <a href="/login">
              <img
                className="login-icon"
                aria-label="login"
                src={loginIcon}
                alt="Login icon"
              />
            </a>
          </li>
        </ul>
      </div>
      <main className="links-container">
        <ul className="ul-container">
          <a href="/" className="navbar-li" aria-label="home">
            Ropero solidario
          </a>
          <a href="/aboutus" className="navbar-li" aria-label="aboutus">
            Información adicional
          </a>
          <a href="/contact" className="navbar-li" aria-label="contact">
            Contacto
          </a>
          <a href="/login">
            <img
              className="login-icon"
              aria-label="login"
              height="70rem"
              src={loginIcon}
              alt="Login icon"
            />
          </a>
        </ul>
      </main>
    </nav>
  );
}

export default Header;
