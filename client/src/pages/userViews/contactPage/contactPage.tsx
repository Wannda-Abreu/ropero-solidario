import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="card-container">
      <Card border="0">
        <Card.Body className="user-card-text d-flex flex-column flex-md-row justify-content-center align-items-center">
          <Card.Text className="user-txt text-center">
           
            <p className="m-4 d-flex contact-info">
              <span className="info-section whatsapp-section m-3 ">
                <FontAwesomeIcon icon={faWhatsapp} size="4x" />
                <h6 className="m-2">WhatsApp:</h6>
                 +34 677450122
              </span>
              <span className="info-section location-section m-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" />
                <h6 className="m-2">Dirección:</h6>
                C/ del Alcalde Sainz de Baranda, 93 28007 Madrid
              </span>
              <span className="info-section clock-section m-3">
                <FontAwesomeIcon icon={faClock} size="4x" />
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
