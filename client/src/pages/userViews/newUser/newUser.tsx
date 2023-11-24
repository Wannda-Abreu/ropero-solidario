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
              <h5 className="mb-4">Bienvenido a proyecto ropero solidario</h5>
              <p className="mb-4">
              Si eres nuevo en Ropero Solidario, diríjase a tu centro de servicios sociales para que te realicen un informe de derivación.
              </p>
              <p className="mb-5">
              Una vez que tengas el informe de derivación contáctanos por WhatsApp +34 677450122. Agradecemos tu colaboración y estamos comprometidos a brindarte el mejor apoyo. ¡Esperamos tu visita!
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

