import { BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import {render, /*screen*/} from '@testing-library/react';
import { Link } from "react-router-dom";
import logotype from "../src/assets/Logos/white-logo.png"
import GoogleTranslate from "../src/components/GoogleTranslate/GoogleTransalate";
import { HTMLElement } from 'dom';

describe("Testing that the Header is Rendered", () => {
    
    const Header = () => {
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
                    <Link to="/newuser" className="navbar-li" aria-label="aboutus">
                      Información adicional
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
      };
      
     
      beforeEach(() => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
      });

      test("Testing that the div of logo container has renderder the logo-container class",() =>{
        const navBarContainer = document.querySelector('navbar-container');
        expect(navBarContainer).toBeDefined();
    });
    test("Testing that the div of menu-section has renderder the menu-section",() =>{
        const menuContainer = document.querySelector('menu-section');
        expect(menuContainer).toBeDefined();
        
    });
    
    test("Testing that the div of logotype-img has renderder the Logo Image",() =>{
        const logoTypeImg :  HTMLElement = document.querySelector('logotype-img');
        expect(logoTypeImg).toBeDefined();
        if (logoTypeImg) {
          test("Testing the src and alt of te Logo", ()=> {
            expect(logoTypeImg.src).toBeDefined();
            expect(logoTypeImg.alt).toBeDefined();
        })
         
        }

    });

    test("Testing that the div of right-container has renderder the Right Container",() =>{
        const rightContainer = document.querySelector('right-container');
        expect(rightContainer).toBeDefined();
    });
    test("Testing that the ul of navbar-li has renderder the NavBar List",() =>{
        const navBarList = document.querySelector('navbar-li');
        expect(navBarList).toBeDefined();
    });

    describe('Testing NavBar ul and its children', () => {

        test("Testing that the ul of navbar-li has renderder the NavBar List",() =>{
            const navBarList = document.querySelector('navbar-li');
            expect(navBarList).toBeDefined();
            
        });

       
    })
    
    
});