import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";

interface AppointmentItemProps {
  name: string;
  appointmentDate: string;
  appointmentTime: string;
  phoneNumber: number;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  name,
  appointmentDate,
  appointmentTime,
  phoneNumber,
}) => (
  <div className="p-2">
    <strong>{name}</strong>
    <br />
    Fecha de Cita: {appointmentDate}
    <br />
    Hora de Cita: {appointmentTime}
    <br />
    Teléfono: {phoneNumber}
  </div>
);

const AppointmentsPage: React.FC = () => {
  const [itemsData, setItemsData] = useState<AppointmentItemProps[]>([]);

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await fetch('tu-endpoint-de-api');
        const data = await response.json();
        setItemsData(data);
      } catch (error) {
        console.error('Error al obtener datos de la base de datos', error);
      }
    };

    fetchDataFromDatabase();
  }, []); 

  return (
    <div className="appointment-title p-2">
      <h3> Listado de Citas </h3>
      <Stack gap={3}>
        {itemsData.map(({ name, appointmentDate, appointmentTime, phoneNumber }, index) => (
          <AppointmentItem
            key={index}
            name={name}
            appointmentDate={appointmentDate}
            appointmentTime={appointmentTime}
            phoneNumber={phoneNumber}
          />
        ))}
      </Stack>
    </div>
  );
};

export default AppointmentsPage;


