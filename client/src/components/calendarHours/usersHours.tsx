import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Button from '../Button/Button'; // Asegúrate de importar correctamente tu componente Button
import { useApi } from '../../context/ApiContext';

interface SlotHoursUsersProps {
  selectedDay?: number | null; 
  selectedHourButton: { hour: number; minute: number } | null;
  handleHourButtonClick: (hourInfo: { hour: number; minute: number }) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SlotHoursUsers: React.FC<SlotHoursUsersProps> = ({
  selectedDay,
  selectedHourButton,
  handleHourButtonClick,
  handleSubmit,
}) => {
  const [activeHours, setActiveHours] = useState<any[]>([]);
  const { get } = useApi();

  useEffect(() => {
    const getActiveHours = async () => {
      try {
        const data = await get('appointmentsTime');
        console.log(data);
        setActiveHours(data);
      } catch (error) {
        console.error('Error al obtener datos de la base de datos', error);
      }
    };

    getActiveHours();
  }, []);

  return (
    <div className='selected-slot-hours-users'>
      {activeHours
        .filter((hour) => hour.is_active === 'active')
        .map((uniqueHour) => (
          <button
            key={uniqueHour.available_times}
            className={`slot-hours-button ${
              selectedDay === parseInt(moment(uniqueHour.available_times, 'HH:mm').format('D')) ? 'clicked' : ''
            } ${
              selectedHourButton &&
              selectedHourButton.hour === moment(uniqueHour.available_times, 'HH:mm').hour() &&
              selectedHourButton.minute === moment(uniqueHour.available_times, 'HH:mm').minute()
                ? 'selected-hour-button'
                : ''
            }`}
            onClick={() =>
              handleHourButtonClick({
                hour: moment(uniqueHour.available_times, 'HH:mm').hour(),
                minute: moment(uniqueHour.available_times, 'HH:mm').minute(),
              })
            }
          >
            {moment(uniqueHour.available_times, 'HH:mm').format('LT')}
          </button>
        ))}
      <div className='calendar-btn mt-5'>
        <Link to='/datealert'>
          <Button text='Reservar cita' onClick={handleSubmit} />
        </Link>
      </div>
    </div>
  );
};

export default SlotHoursUsers;