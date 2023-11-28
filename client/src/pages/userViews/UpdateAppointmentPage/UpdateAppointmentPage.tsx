import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "../../../components/Button/Button";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../../../context/ApiContext";

interface RouteParams {
  appointmentId?: string; 
}

const UpdateAppointmentPage: React.FC = () => {
  const { appointmentId } = useParams<RouteParams>();
  const [newDay, setNewDay] = useState("");
  const [newMonth, setNewMonth] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newTime, setNewTime] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [appointmentData, setAppointmentData] = useState<any>({});
  const [inputAppointmentId, setInputAppointmentId] = useState(appointmentId);

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
console.log(updatedUserData);
    try {
      if (inputAppointmentId) {
        const data = await put(`appointments/${inputAppointmentId}`, updatedUserData);
        console.log(data);
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="report-container mt-5 mb-5">
      <Container>
        <Form.Group controlId="appointmentId">
          <Form.Label>Introduce el ID de la cita:</Form.Label>
          <Form.Control
            type="text"
            value={inputAppointmentId || ""}
            onChange={(e) => setInputAppointmentId(e.target.value)}
          />
        </Form.Group>
        
        {inputAppointmentId && Object.keys(appointmentData).length > 0 && (
          <>
            <Form.Group>
              <label>Datos actuales de la cita:</label>
              <div>
                Día de la cita: {appointmentData.appointment_day}
                Mes de la cita: {appointmentData.appointment_month}
                Año de la cita: {appointmentData.appointment_year}
                Hora de la cita: {appointmentData.appointment_timeC}
              </div>
            </Form.Group>

            <Form.Group controlId="newDate">
              <Form.Label>Nueva día de la cita:</Form.Label>
              <Form.Control
                type="text"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="newMonth">
              <Form.Label>Nuevo mes de la cita:</Form.Label>
              <Form.Control
                type="text"
                value={newMonth}
                onChange={(e) => setNewMonth(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="newYear">
              <Form.Label>Nuevo año de la cita:</Form.Label>
              <Form.Control
                type="text"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="newTime">
              <Form.Label>Nueva hora de la cita:</Form.Label>
              <Form.Control
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </Form.Group>

            <div className="form-button">
              <Link to={`/appointments/${inputAppointmentId}`}>
                <Button text="Actualizar cita" onClick={handleSubmit} />
              </Link>
            </div>
          </>
        )}
      </Container>
    </Form>
  );
};

export default UpdateAppointmentPage;
