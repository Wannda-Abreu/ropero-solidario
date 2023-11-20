import Card from "react-bootstrap/Card";
import Button from "../../../components/Button/Button.tsx";
import Image from "react-bootstrap/Image";
import new_user_image from "../../../assets/Images/new-user-image.png";
import "./newUser.css"
import { Link } from "react-router-dom";

function NewUser() {
  return (
    <div className="card-container">
      <Card border="0">
        <Card.Body className="user-card-text d-flex flex-column flex-md-row justify-content-center align-items-center">
          <div className="col-md-6 mb-3 d-flex justify-content-center">
            <Card.Text className="user-txt text-center">
              <h6 className="mb-4">Bienvenido a proyecto ropero solidario</h6>
              <p className="mb-4">
                Para comenzar el proceso de asistencia, por favor, dirígete a
                la oficina externa de Servicios Sociales ubicada en [dirección]. Allí, encontrarás el formulario necesario para iniciar el proceso y recibir el apoyo adecuado.
              </p>
              <p className="mb-5">
                Tras completar el formulario, contáctanos por WhatsApp para más detalles. Agradecemos tu colaboración y estamos comprometidos a brindarte el mejor apoyo. ¡Esperamos tu visita!
              </p>
              <div className="card-button d-flex justify-content-center">
              <Link to="/">
                <Button text="Volver a la página principal" />
              </Link>
              </div>
            </Card.Text>
          </div>
          <div className="col-md-5 d-flex justify-content-center">
            <Image className="image" src={new_user_image} fluid />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NewUser;

