import { Calendar, momentLocalizer, DateLocalizer, View, NavigateAction, DateHeaderProps } from 'react-big-calendar';
import { useState} from 'react';
import moment from 'moment';
import React from 'react';
import prevIcon from '../../../assets/Icons/prevIcon.png';
import nextIcon from '../../../assets/Icons/nextIcon.png';
import  AdminSelectedSlotHours, { AdminSelectedSlotHoursProps } from '../../../components/calendarHours/selectedHours';

import './calendar.css';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';

const localizer: DateLocalizer = momentLocalizer(moment);

interface CustomToolbarProps {
  label: string;
  localizer: any;
  onView: (view: View) => void;
  onNavigate: (action: NavigateAction, date?: Date) => void;
  className?: string;
}


interface MyCalendarProps {
  SelectedSlotHoursComponent: React.ComponentType<AdminSelectedSlotHoursProps>;
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
        <img className='actionImg' src={prevIcon} alt="Previous" />
      </button>
      <div className="current-month">{label}</div>
      <button onClick={goToNext}>
        <img className='actionImg' src={nextIcon} alt="Next" />
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

  const formData = {
    selectedTime,
    selectedDay,
    selectedMonth,
    selectedYear,
  };
  console.log(formData)

    console.log(currentMonth)
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

  const isCurrentMonth = (date: Date) => moment(date).isSame(currentMonth, 'month');

  const handleHourButtonClick = (hour: number) => {
    if (selectedEvent) {
      const selectedDate = moment(selectedEvent).clone().set({ hours: hour, minutes: 0, seconds: 0 });
      const selectedTimeString = selectedDate.format('LT');
      setSelectedTime(selectedTimeString);
    }
  };

  const renderSelectedSlotHours = () => {
    if (selectedEvent && SelectedSlotHoursComponent) {
      const selectedDate = moment(selectedEvent);
      return (
        <AdminSelectedSlotHours
          selectedDate={selectedDate}
          handleHourButtonClick={handleHourButtonClick}
        />
      );
    }else if (selectedEvent){

          const selectedDate = moment(selectedEvent);
          return (
            <div className="selected-slot-hours">
              <p>Horas Disponibles:</p>
              <button className='slot-hours-button' onClick={() => handleHourButtonClick(selectedDate.hour())}>
                {selectedDate.format('LT')}
              </button>
              <button className='slot-hours-button' onClick={() => handleHourButtonClick(selectedDate.clone().add(2, 'hours').hour())}>
                {selectedDate.clone().add(2, 'hours').format('LT')}
              </button>
              <button className='slot-hours-button' onClick={() => handleHourButtonClick(selectedDate.clone().add(3, 'hours').hour())}>
                {selectedDate.clone().add(3, 'hours').format('LT')}
              </button>
              <Link to="/datealert">
                <Button text="Reservar cita" />
              </Link>
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
                handleMonthChange(action)
                props.onNavigate(action, date);
              }}
            />
          ),
          month: {
            dateHeader: ({ date }: DateHeaderProps) => {
              const dayOfMonth = moment(date).format('D');
              const isInCurrentMonth = isCurrentMonth(date);

              const dayClasses = `custom-date-header ${isInCurrentMonth ? 'current-month-day' : 'other-month-day'}`;  
              
              return (
                <div className={dayClasses} onClick={() => handleSelectEvent({ start: date, end: date })}>
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

{/*
  <AdminSelectedSlotHours
    selectedDate={selectedDate}
    handleHourButtonClick={handleHourButtonClick}
  />
*/}