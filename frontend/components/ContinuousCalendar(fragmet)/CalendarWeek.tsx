import React from 'react';
import CalendarDay from './CalendarDay';

interface Day { month: number, day: number }
interface Props {
  week: Day[];
  year: number;
  activeDays: Record<string, boolean>;
  dayRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  handleDayClick: (day:number, month:number, year:number) => void;
  handleToggleTraining: (day:number, month:number, year:number) => void;
}

const CalendarWeek: React.FC<Props> = ({ week, year, activeDays, dayRefs, handleDayClick, handleToggleTraining }) => (
  <div className="flex w-full">
    {week.map(({ month, day }, i) => (
      <CalendarDay
        key={`${month}-${day}`}
        day={day}
        month={month}
        year={year}
        isToday={new Date().getFullYear()===year && new Date().getMonth()===month && new Date().getDate()===day}
        active={activeDays[`${month}-${day}`] ?? false}
        dayRefs={dayRefs}
        index={i}
        handleDayClick={handleDayClick}
        handleToggleTraining={handleToggleTraining}
      />
    ))}
  </div>
);

export default CalendarWeek;
