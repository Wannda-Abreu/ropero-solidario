import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "../../../components/Button/Button.tsx";
import AlertComponent from "../../../components/Alert/alert.tsx";
import { Link } from "react-router-dom";
import { useApi } from "../../../context/ApiContext";

interface AlertProps {
  variant: string;
  heading: string;
  message: string;
  additionalMessage: string;
}

function AppoinmentConfirmation() {
  const { get } = useApi();

  const [updatedAppointment, setUpdatedAppointment] = useState<any>({});

  const alertProps: AlertProps = {
    variant: "success",
    heading: "¡Cita Confirmada!",
    message:
      "¡Tu cita está confirmada! En caso de que no puedas asistir, por favor contáctanos para reprogramar o cancelar.",
    additionalMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing ipsu",
  };

  useEffect(() => {
    // Fetch updated appointment data using the appointmentId or any other identifier
    const fetchUpdatedAppointment = async () => {
      try {
        const data = await get(`appointments/${inputAppointmentId}`);
        setUpdatedAppointment(data);
      } catch (error) {
        console.error("Error fetching updated appointment data:", error);
      }
    };

    fetchUpdatedAppointment();
  }, []);

  return (
    <div className="appointment-container  d-flex justify-content-center align-items-center mt-5">
      <Card className="w-100">
        <Card.Body className="border-0 d-flex flex-column align-items-center">
          <div className="confirmation-container mb-5 d-flex flex-column align-items-center justify-content-center text-center">
            <AlertComponent {...alertProps} />
            {Object.keys(updatedAppointment).length > 0 && (
              <div>
                <p>Nueva fecha de la cita: {updatedAppointment.appointment_day}/{updatedAppointment.appointment_month}/{updatedAppointment.appointment_year}</p>
                <p>Nueva hora de la cita: {updatedAppointment.appointment_timeC}</p>
              </div>
            )}
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
