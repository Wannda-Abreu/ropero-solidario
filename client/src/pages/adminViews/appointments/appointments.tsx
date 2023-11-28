import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useApi } from "../../../context/ApiContext";

interface AppointmentItemProps {
  appointment_day: string;
  appointment_month: string;
  appointment_timeC: string;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({

  appointment_day,
  appointment_month,
  appointment_timeC
}) => (
  <div className="p-2">

    <br />
    Fecha de la Cita: {appointment_day}
    <br />
    Mes de la Cita: {appointment_month}
    <br />
    Hora de la Cita: {appointment_timeC}
  </div>
);

const AppointmentsPage: React.FC = () => {
  const [itemsData, setItemsData] = useState<AppointmentItemProps[]>([]);
  const {get} = useApi()

  useEffect(() => {
    const getAppoiments = async () => {
      try {
        const data = await get('appointments');
        console.log(data)
        setItemsData(data);
      } catch (error) {
        console.error('Error al obtener datos de la base de datos', error);
      }
    };

    getAppoiments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="appointment-title p-2">
      <h3> Listado de Citas </h3>
      <Stack gap={3}>
        {itemsData.map(({ appointment_day, appointment_timeC, appointment_month }, index) => (
          <AppointmentItem
            key={index}
            appointment_day={appointment_day}
            appointment_timeC={appointment_timeC}
            appointment_month={appointment_month}          />
        ))}
      </Stack>
    </div>
  );
};

export default AppointmentsPage;


