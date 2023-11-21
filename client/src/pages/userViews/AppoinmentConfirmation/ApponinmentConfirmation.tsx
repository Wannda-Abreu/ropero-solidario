import Card from "react-bootstrap/Card";
import Button from "../../../components/Button/Button.tsx";
import AlertComponent from "../../../components/Alert/alert.tsx";
import { Link } from 'react-router-dom';

interface AlertProps {
  variant: string;
  heading: string;
  message: string;
  additionalMessage: string;
}

function AppoinmentConfirmation() {
  const alertProps: AlertProps = {
    variant: "success",
    heading: "¡Cita Confirmada!",
    message:
      "¡Tu cita está confirmada! En caso de que no puedas asistir, por favor contáctanos para reprogramar o cancelar.",
    additionalMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing ipsu",
  };

  return (
    <div className="appointment-container  d-flex justify-content-center align-items-center mt-5">
      <Card className="w-100">
        <Card.Body className="border-0 d-flex flex-column align-items-center">
          <div className="confirmation-container mb-5 d-flex flex-column align-items-center justify-content-center text-center">
            <AlertComponent {...alertProps} />
          </div>
          <Link to="/">
          <div className="mb-5">
            <Button text="Volver a la página principal" />
          </div>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AppoinmentConfirmation;
