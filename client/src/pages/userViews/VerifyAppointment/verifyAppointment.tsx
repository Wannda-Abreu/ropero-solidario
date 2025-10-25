import VerifyAppointmentCard from "@/components/VerifyAppointmentCard/VerifyAppointmentCard";
import "./verifyAppointment.css";

const VerifyAppointmentPage = () => {
  return (
    <div className="verify-appointment-page">
      <h1>Consulta de cita</h1>
      <p>
        Si ya confirmaste una cita, introduce el código que recibiste para
        comprobar la fecha y hora asignadas.
      </p>
      <VerifyAppointmentCard />
    </div>
  );
};

export default VerifyAppointmentPage;
