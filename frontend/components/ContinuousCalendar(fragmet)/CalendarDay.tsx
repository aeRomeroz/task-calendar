import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdRunCircle, MdDirectionsRun } from 'react-icons/md';

interface Props {
  day: number;
  month: number;
  year: number;
  isToday: boolean;
  active: boolean;
  index: number;
  dayRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  handleDayClick: (day:number, month:number, year:number) => void;
  handleToggleTraining: (day:number, month:number, year:number) => void;
}

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const CalendarDay: React.FC<Props> = ({ day, month, year, isToday, active, index, dayRefs, handleDayClick, handleToggleTraining }) => {
  const isNewMonth = index === 0 || false; // para simplificar, se puede pasar prop desde semana

  return (
    <div
      ref={el => dayRefs.current[index] = el}
      data-month={month}
      data-day={day}
      onClick={() => handleDayClick(day, month, year)}
      className="relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40"
    >
      <span className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${isToday ? 'bg-blue-500 font-semibold text-white' : ''} ${month < 0 ? 'text-slate-400' : 'text-slate-800'}`}>
        {day}
      </span>
      {isNewMonth && (
        <span className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-slate-300 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-3.5 lg:-mb-1 lg:w-fit lg:px-0 lg:text-xl 2xl:mb-[-4px] 2xl:text-2xl">
          {monthNames[month]}
        </span>
      )}
      <div className="relative w-full h-full transition-all">
        <button type="button" onClick={() => handleToggleTraining(day, month, year)} className='absolute right-2 top-2'>
          {active ? <MdRunCircle className="size-8 scale-90 text-green-500 transition-all hover:scale-100"/> : <MdDirectionsRun className="size-8 scale-90 text-gray-500 transition-all hover:scale-100 opacity-0  group-hover:opacity-100 focus:opacity-100" />}
        </button>
        <button type="button" className='opacity-0  group-hover:opacity-100 focus:opacity-100 absolute right-2 bottom-2'>
          <IoIosAddCircle className="size-8 scale-90 text-blue-500 transition-all hover:scale-100"/>
        </button>
      </div>
    </div>
  );
};

export default CalendarDay;
