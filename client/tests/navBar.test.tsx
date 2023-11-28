import { BrowserRouter } from 'react-router-dom';
import { useState } from "react";
import {getByTestId, render, screen} from '@testing-library/react';
import { Link } from "react-router-dom";
import logotype from "../src/assets/Logos/white-logo.png"
import GoogleTranslate from "../src/components/GoogleTranslate/GoogleTransalate";


describe("Testing that the Header is Rendered", () => {
    
    const Header = () => {
        const [showDropdown, setShowDropdown] = useState(false);
      
        const toggleDropdown = () => {
          setShowDropdown(!showDropdown);
        };
      
        return (
          <nav aria-label="Navbar" className="navbar-container" data-testid = "navBarContainer">
            <div className="menu-section" data-testid = "menuSection">
              <Link to="/" data-testid = "LogotypeLink">
                <img
                  src={logotype}
                  aria-label="logotype"
                  className="logotype-img"
                  alt="Image of logotype"
                  data-testid = "LogotypeImg"
                />
              </Link>
              <div className="right-container" data-testid = "rightContainer">
                <main className="links-container" data-testid = "mainLinksContainer">
                  <ul className="ul-container" data-testid = "topListUl">
                    <Link to="/" className="navbar-li" aria-label="home" data-testid = "topNavBarLi1">
                      Ropero solidario
                    </Link>
                    <Link to="/newuser" className="navbar-li" aria-label="aboutus" data-testid = "topNavBarLi2">
                      Información adicional
                    </Link>
                    <Link to="/contact" className="navbar-li" aria-label="contact" data-testid = "topNavBarLi3">
                      Contacto
                    </Link>
                  </ul>
                </main>
                <GoogleTranslate />
                <div className="mobile-menu" data-testid = "mobileMenu">
                  <button
                    onClick={toggleDropdown}
                    className="mobile-menu-button"
                    aria-label="menu"
                    data-testid = "mobileMenuButton"
                  >
                    {showDropdown ? (
                      <div className="close-icon" data-testid = "closeIcon">
                        <div className="line-horizontal" data-testid = "horizontaLine"></div>
                        <div className="line-vertical" data-testid = "verticalLine"></div>
                      </div>
                    ) : (
                      "☰"
                    )}
                  </button>
                  <ul data-testid = "hamburgerMenuUL" className={`mobile-dropdown ${showDropdown ? "show" : ""} `}>
                    <li data-testid = "hamburgerMenuLi1">
                      <Link to="/" className="navbar-li" aria-label="home" data-testid = "hamburgerMenuLink1">
                        Ropero solidario
                      </Link>
                    </li>
                    <li data-testid = "hamburgerMenuLi2">
                      <Link to="/newuser" aria-label="info" data-testid = "hamburgerMenuLink2">
                        Información adicional 
                      </Link>
                    </li>
                    <li data-testid = "hamburgerMenuLi3">
                      <Link to="/contact" aria-label="contact" data-testid = "hamburgerMenuLink3">
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
        const navBarContainer = screen.getByTestId('navBarContainer');
        expect(navBarContainer).toBeDefined();
        screen.debug();
    });
    test("Testing that the div of menu-section has renderder the menu-section",() =>{
        const menuContainer = screen.getByTestId('menuSection');
        expect(menuContainer).toBeDefined();
        
    });
    
    test("Testing that the div of logotype-img has renderder the Logo Image",() =>{
        const logoTypeImg = screen.getByTestId('LogotypeImg');
        expect(logoTypeImg).toBeDefined();
    });

    test("Testing that the div of right-container has renderder the Right Container",() =>{
        const rightContainer = screen.getByTestId('rightContainer');
        expect(rightContainer).toBeDefined();
    });
   
    describe('Testing NavBar ul and its children', () => {

        test("Testing that the ul of navbar-li has renderder the NavBar List",() =>{
            const navBarList = screen.getByTestId('mainLinksContainer');
            expect(navBarList).toBeDefined();
            
        });

        test("Testing that the ul of navbar-li has renderder the NavBar List",() =>{
          const navBarList = screen.getByTestId('mainLinksContainer');
          expect(navBarList).toBeDefined();
      });
  

       
    })
    
    
});