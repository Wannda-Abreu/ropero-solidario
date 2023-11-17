import { Calendar, momentLocalizer, DateLocalizer, View, NavigateAction } from 'react-big-calendar';
import { useState } from 'react';
import moment from 'moment';
import React from 'react';
import prevIcon from '../../assets/Icons/prevIcon.png';
import nextIcon from '../../assets/Icons/nextIcon.png';
import './calendar.css';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const localizer: DateLocalizer = momentLocalizer(moment);

interface CustomToolbarProps {
  label: string;
  localizer: any;
  onView: (view: View) => void;
  onNavigate: (action: NavigateAction, date?: Date) => void;
  className?: string;
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

const MyCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

    const formData= {
      selectedTime,
      selectedDay,
      selectedMonth,
      selectedYear

    }
  const handleSelectEvent = (event: { start: Date; end: Date }) => {

    setSelectedEvent(event.start);
    const selectedDate = moment(event.start);


    const selectDayString = selectedDate.format('D');
    const selectMonthString = selectedDate.format('MMMM');
    const selectYearString = selectedDate.format('YYYY');


    setSelectedMonth(selectMonthString);
    setSelectedDay(selectDayString);
    setSelectedYear(selectYearString)
  };

  console.log(formData)

  const handleHourButtonClick = (hour: number) => {
    
    if (selectedEvent) {

      const selectedDate = moment(selectedEvent).clone().set({ hours: hour, minutes: 0, seconds: 0 });

      const selectedTimeString = selectedDate.format('LT');

      setSelectedTime(selectedTimeString);
    }
  };

  const renderSelectedSlotHours = () => {
    if (selectedEvent) {
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
          <button className='slot-hours-button' onClick={() => handleHourButtonClick(selectedDate.clone().add(2, 'hours').hour())}>
            {selectedDate.clone().add(3, 'hours').format('LT')}

          <Link to="/datealert">
          <Button text="Reservar cita" />
        </Link>
          </button>
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
            <CustomToolbar {...props} />
          ),
          month: {
            dateHeader: ({ date }: { date: Date }) => (
              <div className="custom-date-header" onClick={() => handleSelectEvent({ start: date, end: date })}>
                {moment(date).format('D')}
              </div>
            ),
          },
        }}
        views={['month', 'week', 'day']}
        defaultView={'month'}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        dayPropGetter={(date: Date) => {
          const isDifferentMonth = moment(date).format('M') !== moment().format('M');
          return isDifferentMonth ? { className: 'hidden-day' } : {};
        }}
      />
      {renderSelectedSlotHours()} 
    </div>
  );
};

export default MyCalendar;
