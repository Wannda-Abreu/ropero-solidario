import { BrowserRouter } from 'react-router-dom';
import { render, screen} from '@testing-library/react';
import logotype from "../../assets/Logos/white-logo.png";

describe("Testing that the Footer is Rendered", () => {
    function Footer() {
        return (
          <main>
            <section aria-label="Footer" className="banner" data-testid = "Footer">
              <div className="footer-content" data-testid = "footer-content">
                <div className="footer-text" data-testid = "footer-text">
                  <h6>Ropero Solidario</h6>
                  <h6>Fundación Instituto San José</h6>
                  <h6>Hermanos de San Juan de Dios</h6>
                </div> 
                <img
                  aria-label="logotype"
                  className="footer-logo"
                  src={logotype}
                  alt="Image of logotype"
                  data-testid = "footer-logo"
                />
                <div className="footer-text column" data-testid = "footer-text column">
                  <div aria-label="copyright" className="copyright-text" data-testid = "copyright-text">
                    © 2023 Copyright:
                  </div>
                </div>
              </div>
            </section>
          </main>
        );
    }

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );
      });  

})