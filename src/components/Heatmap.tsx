import React from 'react';

interface HeatmapProps {
  daysInMonth: number;
  dayCompletion: { [key: number]: number };
  selectedDay: number | null;
  onDaySelect: (day: number) => void;
}

const Heatmap: React.FC<HeatmapProps> = ({ daysInMonth, dayCompletion, selectedDay, onDaySelect }) => {
  const getHeatmapColor = (percentage: number) => {
    if (percentage === 100) return '#388E3C';
    if (percentage >= 75) return '#4CAF50';
    if (percentage >= 50) return '#81C784';
    if (percentage >= 25) return '#A5D6A7';
    return '';
  };

  const rows: JSX.Element[] = [];
  let row: JSX.Element[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const completionPercentage = dayCompletion[day] || 0;
    const color = getHeatmapColor(completionPercentage);

    row.push(
      <div
        key={day}
        className="heatmap-cell"
        style={{ backgroundColor: color }}
        onClick={() => onDaySelect(day)}
      >
        {day}
      </div>
    );

    if (row.length === 7 || day === daysInMonth) {
      rows.push(<div className="heatmap-row" key={`row-${day}`}>{row}</div>);
      row = [];
    }
  }

  return <div className="heatmap-grid">{rows}</div>;
};

export default Heatmap;
