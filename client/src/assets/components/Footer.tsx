import logotype from "../Logos/white-logo.png";
import "./Footer.css";

function Footer() {
  return (
    <main>
      <section aria-label="Footer" className="banner">
        <div className="footer-content">
        <h7> Ropero Solidario </h7>
        <h7>Fundación Instituto San José Hermanos de San Juan de Dios </h7>
          <img
            aria-label="logotype"
            className="footer-logo"
            src={logotype}
            alt="Image of logotype"
          />
          <div aria-label="copyright" className="cppyright-text">
            © 2023 Copyright:
          </div>
        </div>
      </section>
    </main>
  );
}

export default Footer;
