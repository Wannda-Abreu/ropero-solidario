import React, { useState } from 'react';
import moment from 'moment';
import { useApi } from '../../context/ApiContext';

import './selectedHours.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';



interface SlotHoursButtonProps {
  onClick: () => void;
  label: string;
  isSelected: boolean;
}

const SlotHoursButton: React.FC<SlotHoursButtonProps> = ({ onClick, label, isSelected }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={`slot-hours-button ${isSelected ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export interface AdminSelectedSlotHoursProps {
  selectedDate: moment.Moment;
  handleHourButtonClick: (hour: number, minute: number) => null;
}
const AdminSelectedSlotHours: React.FC<AdminSelectedSlotHoursProps> = ({ selectedDate, handleHourButtonClick }) => {
  const [selectedHours, setSelectedHours] = useState<{ hour: number; minute: number }[]>([]);

  const startHour = 7;
  const endHour = 20;
  const intervalMinutes = 30;

  const { put } = useApi();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const promises = selectedHours.map(async (hour) => {
        const data = await put('appointmentsTime', {
          available_times: `${hour.hour < 10 ? '0' : ''}${hour.hour}:${hour.minute === 0 ? '00' : hour.minute}`,
          is_active: 'active', // Asigna 'active' a todas las horas seleccionadas, puedes ajustar según tus necesidades
        });
        console.log(data);
        return data;
      });

      const responseData = await Promise.all(promises);
      console.log(responseData);


    } catch (error) {
      console.error('Error al enviar datos:', error);
      console.log('Sorry, hubo un error');
    }
  };

  const timeSlots: { hour: number; minute: number }[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    timeSlots.push({ hour, minute: 0 });
    timeSlots.push({ hour, minute: 30 });
  }

  const hourInfo = timeSlots.map((time) => ({
    hour: `${time.hour < 10 ? '0' : ''}${time.hour}:${time.minute === 0 ? '00' : time.minute}`,
    isSelected: selectedHours.some(selected => selected.hour === time.hour && selected.minute === time.minute),
  }));

  const handleButtonClick = (hour: number, minute: number) => {
    const selectedHour = { hour, minute };
    if (selectedHours.some(selected => selected.hour === hour && selected.minute === minute)) {
      setSelectedHours(selectedHours.filter(selected => !(selected.hour === hour && selected.minute === minute)));
    } else {
      setSelectedHours([...selectedHours, selectedHour]);
    }
    handleHourButtonClick(hour, minute);
  };

  const timeSlotsButtons = hourInfo.map(({ hour, isSelected }) => (
    <SlotHoursButton
      key={`${hour}`}
      onClick={() => handleButtonClick(Number(hour.split(':')[0]), Number(hour.split(':')[1]))}
      label={hour}
      isSelected={isSelected}
    />
  ));

  return (
    <>
      <p>Horas Disponibles:</p>
      <div className="selected-slot-hours-admin">
        {timeSlotsButtons}
      </div>
      <div className='button-calendar-admin'>
        <Button text="Reservar cita" onClick={handleSubmit} className='button-admin-hours' />
      </div>
    </>
  );
};

export default AdminSelectedSlotHours;