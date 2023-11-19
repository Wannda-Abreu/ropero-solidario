import React, { useState } from 'react';
import moment from 'moment';
import './selectedHours.css';

interface SlotHoursButtonProps {
    onClick: () => void;
    label: string;
    isSelected: boolean;
}

const SlotHoursButton: React.FC<SlotHoursButtonProps> = ({ onClick, label, isSelected }) => (
    <button
        className={`slot-hours-button ${isSelected ? 'clicked' : ''}`}
        onClick={onClick}
>
        {label}
    </button>
);

interface AdminSelectedSlotHoursProps {
    selectedDate: moment.Moment;
    handleHourButtonClick: (hour: number) => void;
}

const AdminSelectedSlotHours: React.FC<AdminSelectedSlotHoursProps> = ({ selectedDate, handleHourButtonClick }) => {
    const startHour = 7;
    const endHour = 20;
    const [selectedHour, setSelectedHour] = useState<number | null>(null);

const handleButtonClick = (hour: number) => {
    setSelectedHour(hour);
    handleHourButtonClick(hour);
};

const hoursButtons = [...Array(endHour - startHour + 1)].map((_, index) => {
    const hour = startHour + index;
    return (
    <SlotHoursButton
        key={index}
        onClick={() => handleButtonClick(hour)}
        label={`${hour}:00`}
        isSelected={selectedHour === hour}
    />
    );
});

return (
    <div className="selected-slot-hours">
        <p>Horas Disponibles:</p>
        {hoursButtons}
    </div>
);
};

export default AdminSelectedSlotHours;
