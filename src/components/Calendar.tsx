import React from 'react';
import { getDaysInMonth, getMonthName } from '../Utils/dateUtils';

interface CalendarProps {
  daysInMonth: number;
  dayCompletion: { [key: number]: number };
  selectedDay: number | null;
  onDaySelect: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  daysInMonth,
  dayCompletion,
  selectedDay,
  onDaySelect,
}) => {
  const renderDays = () => {
    const days: JSX.Element[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDay === i;
      const completion = dayCompletion[i] || 0;

      days.push(
        <div
          key={i}
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => onDaySelect(i)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            margin: '5px',
            textAlign: 'center',
            borderRadius: '5px',
            backgroundColor: isSelected ? '#007bff' : '#f4f4f4',
            color: isSelected ? 'white' : 'black',
            boxShadow: isSelected ? '0px 0px 10px rgba(0, 123, 255, 0.5)' : 'none',
          }}
        >
          <div>{i}</div>
          {completion > 0 && <div>{completion}%</div>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>{getMonthName(new Date().getMonth() + 1)} {new Date().getFullYear()}</h3>
      </div>
      <div className="calendar-body">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
