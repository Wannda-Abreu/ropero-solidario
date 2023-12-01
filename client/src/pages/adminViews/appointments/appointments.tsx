import React, { useEffect, useState } from "react";
import { useApi } from "../../../context/ApiContext";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import "./appointments.css";
import { getFilteredAppointments } from "../../../../services/apiService";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

interface AppointmentItemProps {
  appointment_day: string;
  appointment_month: string;
  appointment_timeC: string;
  appointment_year: string;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment_day,
  appointment_month,
  appointment_timeC,
  appointment_year,
}) => (
  <div className="appointment-item d-flex justify-content-start align-items-center mt-3 m-0 p-0">
    <div className="m-2">
      Fecha de la Cita:{" "}
      {`${appointment_day} de ${appointment_month} de ${appointment_year}`}
    </div>
    <div className="m-2">a las: {appointment_timeC}</div>
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
  const [startYear, setStartYear] = useState<string>("");
  const [startMonth, setStartMonth] = useState<string>("");
  const [startDay, setStartDay] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("");
  const [endDay, setEndDay] = useState<string>("");
  const { get } = useApi();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await get("appointments");
        setItemsData(data);
      } catch (error) {
        console.error("Error al obtener datos de la base de datos", error);
      }
    };

    getAppointments();
  }, [get]);

  const handleFilterClick = async () => {
    try {
      const data = await getFilteredAppointments(
        startYear,
        startMonth,
        startDay,
        endYear,
        endMonth,
        endDay
      );
      console.log(data);
      setItemsData(data);
      console.log("Datos en el estado:", itemsData);
    } catch (error) {
      console.error("Error al obtener citas filtradas", error);
    }
  };

  return (
    <div className="appointment-section">
      <h4 className="appointment-title mt-5 mb-5">Listado de citas</h4>
      <div>
        <p className="date-instructions mt-2">
          Utilice el filtro ingresando la fecha de inicio y la fecha final en el
          formato AAAA/MM/DD ejemplo: Desde: 2023/01/01 Hasta: 2023/02/15{" "}
          <FontAwesomeIcon
            className="m-1 mt-0"
            icon={faCalendarAlt}
          ></FontAwesomeIcon>
        </p>
      </div>

      <div className="date-filter">
        <h6 className="mt-4">Desde</h6>
        <label className="appointment-label mt-2" htmlFor="start-year">
          Año:
        </label>
        <input
          className="appointment-input"
          type="text"
          value={startYear}
          placeholder="aaaa"
          onChange={(e) => setStartYear(e.target.value)}
        />

        <label className="appointment-label mt-2" htmlFor="start-month">
          Mes:
        </label>
        <input
          className="appointment-input"
          type="text"
          value={startMonth}
          placeholder="mm"
          onChange={(e) => setStartMonth(e.target.value)}
        />

        <label className="appointment-label mt-2" htmlFor="start-day">
          Día:
        </label>
        <input
          className="appointment-input"
          id="start-day"
          type="text"
          value={startDay}
          placeholder="dd"
          onChange={(e) => setStartDay(e.target.value)}
        />

        <h6 className="mt-4">Hasta</h6>
        <label className="appointment-label mt-2" htmlFor="end-year">
          año:
        </label>
        <input
          className="appointment-input"
          id="end-year"
          type="text"
          value={endYear}
          placeholder="aaaa"
          onChange={(e) => setEndYear(e.target.value)}
        />

        <label className="mt-2" htmlFor="end-month">
          mes:
        </label>
        <input
          className="appointment-input"
          id="end-month"
          type="text"
          value={endMonth}
          placeholder="mm"
          onChange={(e) => setEndMonth(e.target.value)}
        />

        <label className="mt-2" htmlFor="end-day">
          Día:
        </label>
        <input
          className="appointment-input"
          id="end-day"
          type="text"
          value={endDay}
          placeholder="dd"
          onChange={(e) => setEndDay(e.target.value)}
        />
      </div>

      <button className="filter-button mt-5 mb-2" onClick={handleFilterClick}>
        Aplicar Filtro
      </button>

      <Stack>
        {itemsData && itemsData.length > 0 ? (
          itemsData.map((appointment, index) => (
            <div className="appointment-item-container" key={index}>
              <AppointmentItem
                appointment_day={appointment.appointment_day}
                appointment_timeC={appointment.appointment_timeC}
                appointment_month={appointment.appointment_month}
                appointment_year={appointment.appointment_year}
              />
            </div>
          ))
        ) : (
          <div>No hay citas disponibles.</div>
        )}
      </Stack>
    </div>
  );
};
export default AppointmentsPage;
