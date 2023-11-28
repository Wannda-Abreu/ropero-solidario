import React, { useEffect, useState } from "react";
import { useApi } from "../../../context/ApiContext";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import './appointments.css'

interface AppointmentItemProps {
  appointment_day: string;
  appointment_month: string;
  appointment_timeC: string;
  appointment_year:string;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment_day,
  appointment_month,
  appointment_timeC,
  appointment_year
}) => (
  <div className="appointment-item m-0 d-flex justify-content-start align-items-center mt-3 m-0 p-0">
    <div className="m-2">
      Fecha de la Cita: {appointment_day} 
    </div>
    <div className="m-2">
     de {appointment_month}
    </div>
    <div className="m-2">
     de {appointment_year}
    </div>
    <div className="m-2">
      a las: {appointment_timeC}
    </div>
    <button className="appointment-button m-2">
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button className="appointment-button m-2">
        <FontAwesomeIcon icon={faTrash} />
      </button>
  </div>
);

const AppointmentsPage: React.FC = () => {
  const [itemsData, setItemsData] = useState<AppointmentItemProps[]>([]);
  const { get } = useApi();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await get('appointments');
        setItemsData(data);
      } catch (error) {
        console.error('Error al obtener datos de la base de datos', error);
      }
    };

    getAppointments();
  }, [get]); 
 
  return (
    <div className="appointment-title m-5">
      <h3 className="m-2">Listado de citas</h3>
      <Stack>
        {itemsData.map((appointment, index) => (
          <div className="appointment-item-container" key={index}>
            <AppointmentItem
              appointment_day={appointment.appointment_day}
              appointment_timeC={appointment.appointment_timeC}
              appointment_month={appointment.appointment_month}
              appointment_year={appointment.appointment_year}
            />
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default AppointmentsPage;
