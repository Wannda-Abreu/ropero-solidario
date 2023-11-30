import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import "./contactPage.css";

function ContactPage() {
  return (
    <div className="card-container">
      <Card border="0">
        <Card.Body className="user-card-text d-flex flex-column flex-md-row justify-content-center align-items-center">
          <Card.Text className="user-txt text-center mb-5">
           
            <p className="contact-info m-3 d-flex">
              <span className="info-section whatsapp-section m-3 ">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                <h6 className="m-2">WhatsApp:</h6>
                 +34 677450122
              </span>
              <span className="info-section location-section m-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                <h6 className="m-2">Dirección:</h6>
                Avenida de la Hospitalidad s/n 28054. Madrid(Salida 30 M-40)
              </span>
              <span className="info-section clock-section m-3">
                <FontAwesomeIcon icon={faClock} size="2x" />
                <h6 className="m-2">Horarios de Atención:</h6>
                 Lunes a Viernes: 10:00 am - 5:00 pm
              </span>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ContactPage;
