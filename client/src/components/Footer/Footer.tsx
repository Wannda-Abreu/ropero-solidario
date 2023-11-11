import React from "react";
import logotype from "../../assets/Logos/white-logo.png";
import "./Footer.css";

function Footer() {
  return (
    <main>
      <section aria-label="Footer" className="banner">
        <div className="footer-content">
          <h6>Ropero Solidario</h6>
          <h6>Fundación Instituto San José Hermanos de San Juan de Dios</h6>
          <img
            aria-label="logotype"
            className="footer-logo"
            src={logotype}
            alt="Image of logotype"
          />
          <div aria-label="copyright" className="copyright-text">
            © 2023 Copyright:
          </div>
        </div>
      </section>
    </main>
  );
}

export default Footer;
