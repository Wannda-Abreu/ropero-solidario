import Card from "react-bootstrap/Card";
import Button from "../../../components/Button/Button.tsx";
import Image from "react-bootstrap/Image";
import new_user_image from "../../../assets/Images/new-user-image.png";
import "./newUser.css";
import { Link } from "react-router-dom";

function NewUser() {
  return (
    <div className="card-container">
      <Card border="0">
        <Card.Body className="user-card-text d-flex flex-column flex-md-row justify-content-center align-items-center">
          <div className="col-md-6 mb-3 d-flex justify-content-center">
            <Card.Text className="user-txt text-center">
              <h5 className="mb-5">¡Bienvenido a Ropero Solidario!</h5>
              <div className="m-1">
                Si eres nuevo en nuestra comunidad, te invitamos a dirigirte a
                tu centro de servicios sociales para que te realicen un informe
                de derivación. Una vez que cuentes con este informe, no dudes en
                ponerte en contacto con nosotros a través de WhatsApp al número
                +34 677 450 122. Valoramos tu colaboración y estamos
                comprometidos a brindarte el mejor apoyo posible. ¡Esperamos con
                entusiasmo tu visita!
              </div>
              <div className="card-button d-flex justify-content-center mt-5">
                <Link to="/">
                  <Button text="Volver a la página principal" />
                </Link>
              </div>
            </Card.Text>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <Image className="image" src={new_user_image} fluid />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NewUser;
