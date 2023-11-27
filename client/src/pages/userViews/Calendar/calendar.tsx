import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';

import {
  Calendar,
  momentLocalizer,
  DateLocalizer,
  View,
  NavigateAction,
  DateHeaderProps,
} from 'react-big-calendar';
import moment from 'moment';

import AdminSelectedSlotHours, {
  AdminSelectedSlotHoursProps,
} from '../../../components/calendarHours/selectedHours';
import prevIcon from '../../../assets/Icons/prevIcon.png';
import nextIcon from '../../../assets/Icons/nextIcon.png';

import { useApi } from '../../../context/FrontContext';

import './calendar.css';

const localizer: DateLocalizer = momentLocalizer(moment);

interface CustomToolbarProps {
  label: string;
  localizer: any;
  onView: (view: View) => void;
  onNavigate: (action: NavigateAction, date?: Date) => void;
  className?: string;
}

interface MyCalendarProps {
  SelectedSlotHoursComponent?: React.ComponentType<AdminSelectedSlotHoursProps>;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onNavigate, label }) => {
  const goToPrevious = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  return (
    <div className={`custom-toolbar`}>
      <button onClick={goToPrevious}>
        <img className='actionImg' src={prevIcon} alt='Previous' />
      </button>
      <div className='current-month'>{label}</div>
      <button onClick={goToNext}>
        <img className='actionImg' src={nextIcon} alt='Next' />
      </button>
    </div>
  );
};

const MyCalendar: React.FC<MyCalendarProps> = ({ SelectedSlotHoursComponent }) => {
  const [selectedEvent, setSelectedEvent] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(moment());
  const [activeHours, setActiveHours] = useState<any[]>([] as any[]);

  const { post, get } = useApi();

  const formData = {
    appointment_timeC: selectedTime,
    appointment_day: selectedDay,
    appointment_month: selectedMonth,
    appointment_year: selectedYear,
  };

  console.log(formData);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const data = await post('appointments', formData);
      console.log(data);

      // Si el post es exitoso, redirigir a /datealert
      window.location.href = '/datealert';
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('Sorry, there was an error');
    }
  };

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectEvent = (event: { start: Date; end: Date }) => {
    setSelectedEvent(event.start);
    const selectedDate = moment(event.start);

    const selectDayString = selectedDate.format('D');
    const selectMonthString = selectedDate.format('MMMM');
    const selectYearString = selectedDate.format('YYYY');

    setSelectedMonth(selectMonthString);
    setSelectedDay(selectDayString);
    setSelectedYear(selectYearString);
  };

  const handleMonthChange = (action: NavigateAction) => {
    if (action === 'PREV') {
      setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    } else if (action === 'NEXT') {
      setCurrentMonth(currentMonth.clone().add(1, 'month'));
    }
  };

  const isCurrentMonth = (date: Date) =>
    moment(date).isSame(currentMonth, 'month');

  const handleHourButtonClick = (hourInfo: { hour: number; minute: number }) => {
    if (selectedEvent) {
      const selectedDate = moment(selectedEvent)
        .clone()
        .set({ hours: hourInfo.hour, minutes: hourInfo.minute, seconds: 0 });
      const selectedTimeString = selectedDate.format('LT');
      setSelectedTime(selectedTimeString);
    }
  };

  const renderSelectedSlotHours = () => {
    if (selectedEvent && SelectedSlotHoursComponent) {
      const selectedDate = moment(selectedEvent);
      return (
        <div className='admin-selected-slot-hours mt-5 d-flex justify-content-center'>
          <AdminSelectedSlotHours
            selectedDate={selectedDate}
            handleHourButtonClick={handleHourButtonClick}
          />
          {/* Cambiar ruta al crear la alerta de confirmación de cita */}
          <div className='admin-calendar-btn mt-5'>
            {/* Contenido adicional aquí */}
          </div>
        </div>
      );
    } else if (selectedEvent) {
      const selectedDate = moment(selectedEvent);

      return (
        <div className='selected-slot-hours-users'>
          {activeHours
            .filter((hour) => hour.is_active === "active")
            .map((uniqueHour) => (
              <button
                key={uniqueHour.available_times}
                className='slot-hours-button'
                onClick={() => handleHourButtonClick({
                  hour: moment(uniqueHour.available_times, 'HH:mm').hour(),
                  minute: moment(uniqueHour.available_times, 'HH:mm').minute(),
                })}
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
    }
    return null;
  };

  return (
    <div className='calendar'>
      <Calendar
        localizer={localizer}
        components={{
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              onNavigate={(action, date) => {
                handleMonthChange(action);
                props.onNavigate(action, date);
              }}
            />
          ),
          month: {
            dateHeader: ({ date }: DateHeaderProps) => {
              const dayOfMonth = moment(date).format('D');
              const isInCurrentMonth = isCurrentMonth(date);

              const dayClasses = `custom-date-header ${
                isInCurrentMonth ? 'current-month-day' : 'other-month-day'
              }`;

              return (
                <div
                  className={dayClasses}
                  onClick={() =>
                    handleSelectEvent({ start: date, end: date })
                  }
                >
                  {dayOfMonth}
                </div>
              );
            },
          },
        }}
        views={['month', 'week', 'day']}
        defaultView={'month'}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        showMultiDayTimes={false}
      />
      {renderSelectedSlotHours()}
    </div>
  );
};

export default MyCalendar;
