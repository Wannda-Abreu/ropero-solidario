import logotype from "../../assets/Logos/white-logo.png";
import "./Footer.css";

function Footer() {
  return (
    <main>
      <section aria-label="Footer" className="banner">
        <div className="footer-content">
          <div className="footer-text">
            <h6>Ropero Solidario</h6>
            <h6>Fundación Instituto San José</h6>
            <h6>Hermanos de San Juan de Dios</h6>
          </div> 
          <img
            aria-label="logotype"
            className="footer-logo"
            src={logotype}
            alt="Image of logotype"
          />
          <div className="footer-text column">
            <div aria-label="copyright" className="copyright-text">
              © 2023 Copyright:
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Footer;

