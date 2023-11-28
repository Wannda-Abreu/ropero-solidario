import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Button from "../../../components/Button/Button.tsx";
import { Link } from "react-router-dom";
import "./home.css"

function Home() {
  return (
    <div className="home-card-container">
      <Card border="0">
        <Card.Body className="user-card-text d-flex flex-column flex-md-row justify-content-center align-items-center">
          <div className="col-md-6 mb-3 d-flex justify-content-center">
            <Card.Text className="user-txt text-center">
              <p className="mt-4">
                ¡Bienvenido al Proyecto Ropero Solidario! Esta app ha sido
                diseñada para mejorar tu experiencia y la de la Fundación San
                José. Accede de manera sencilla para completar datos, confirmar
                citas y recibir ayuda solidaria.
              </p>
              <p className="mt-4"><strong> Instrucciones: </strong> </p>
              <ul className="list-unstyled mb-3">
                <li className="mb-2">
                  <strong>Primer Contacto:</strong> Si es tu primera vez
                  solicitando una donación, haz clic en el botón "Primer
                  Contacto" para comenzar. <FontAwesomeIcon icon={faUser} />
                </li>
                <li className="mb-3">
                  <strong>Usuarios Registrados:</strong> Si ya eres usuario y
                  han transcurrido 6 meses o más desde tu última visita, haz
                  clic en el botón "Ya Soy Usuario".{" "}
                  <FontAwesomeIcon icon={faUserCheck} />
                </li>
              </ul>
              <div className="card-button d-flex flex-column align-items-center">
              <Link to="/newuser">
                <Button text="¿Primer contacto?" />
              </Link>
              </div>
              <div className="card-button d-flex flex-column align-items-center">
                <Link to="/userform">
                  <Button text="Ya soy usuario" />
                </Link>
              </div>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
