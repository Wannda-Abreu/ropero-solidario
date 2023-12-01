import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import { useApi } from "../../../context/ApiContext";
import "./UpdataAppointment.css";

interface RouteParams {
  appointmentId?: string;
}

const UpdateAppointmentPage: React.FC = () => {
  const { appointmentId } = useParams<RouteParams>();
  const [newDay, setNewDay] = useState("");
  const [newMonth, setNewMonth] = useState("")
  const [newYear, setNewYear] = useState("");
  const [newTime, setNewTime] = useState("");
  const [appointmentData, setAppointmentData] = useState<any>({});
  const [inputAppointmentId, setInputAppointmentId] = useState(appointmentId);
  const [showAlert, setShowAlert] = useState(false);

  const { get, put } = useApi();

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        if (inputAppointmentId) {
          const data = await get(`appointments/${inputAppointmentId}`);
          setAppointmentData(data);
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchAppointmentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputAppointmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUserData = {
      appointment_day: newDay,
      appointment_month: newMonth,
      appointment_year: newYear,
      appointment_timeC: newTime,
    };

    try {
      if (inputAppointmentId) {
        const data = await put(
          `appointments/${inputAppointmentId}`,
          updatedUserData
        );
        console.log(data);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="instructions  mt-5 mb-5" md={8}>
          <h5 className="mt-4 mb-3">
            Para actualizar los datos de su cita, siga siguientes instrucciones: 
          </h5>
          <ol>
            <li className="mt-2">
              Ingrese el ID de la cita en el campo correspondiente.<FontAwesomeIcon icon={faCheckCircle} />
            </li>
            <li className="mt-2">
                Revise los detalles actuales de su cita que se muestran.<FontAwesomeIcon icon={faCheckCircle} />
            </li>
            <li className="mt-2">
                Después, introduzca los nuevos datos de su cita en los campos proporcionados.<FontAwesomeIcon icon={faCheckCircle} />
            </li>
            <li className="mt-2">
                Haga clic en el botón "Actualizar cita" para confirmar los cambios.<FontAwesomeIcon icon={faCheckCircle} />
            </li>
          </ol>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="appointment-id mt-3 mb-5" controlId="appointmentId">
              <Form.Label className="mb-3">
                Introduce el ID de su cita:
              </Form.Label>
              <Form.Control className="appointment-input"
                type="text"
                value={inputAppointmentId || ""}
                onChange={(e) => setInputAppointmentId(e.target.value)}
              />
            </Form.Group>

            {inputAppointmentId && Object.keys(appointmentData).length > 0 && (
              <>
                <Form.Group className="appointment-info d-flex align-content-center justify-content-center mt-2 mb-2">
                  <label className="user-date mt-3">
                    Su cita está programada para el día:
                  </label>
                  <div className="d-flex mt-3">
                    <p className="date-item m-1"> {appointmentData.appointment_day}</p>
                    <p className="date-item m-1">de {appointmentData.appointment_month}</p>
                    <p className="date-item m-1">del {appointmentData.appointment_year}</p>
                    <p className="date-item m-1"> a las {appointmentData.appointment_timeC}</p>
                  </div>
                </Form.Group>
                <h5 className=" mt-2"> Introduzca aquí los nuevos datos de su cita </h5>
                <Form.Group controlId="newDate">
                  <Form.Label className="mt-1">Día</Form.Label>
                  <Form.Control
                    type="text"
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="newDate">
                  <Form.Label className="mt-1"> Mes </Form.Label>
                  <Form.Control
                    type="text"
                    value={newMonth}
                    onChange={(e) => setNewMonth (e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="newDate">
                  <Form.Label className="mt-1"> Año </Form.Label>
                  <Form.Control
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="newDate">
                  <Form.Label className="mt-1"> Hora </Form.Label>
                  <Form.Control
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </Form.Group>

                <div className="update-button text-center mt-5 mb-5">
                  <Button text="Actualizar cita" onClick={handleSubmit} />
                </div>
              </>
            )}
          </Form>
          {showAlert && (
            <div className="alert alert-success text-center mb-5" role="alert">
              <p>¡Cita actualizada! </p>
              <p>Su cita está programada para: </p>
              {newDay}/{newMonth}/{newYear}
              <p> a las: {newTime} </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateAppointmentPage;
