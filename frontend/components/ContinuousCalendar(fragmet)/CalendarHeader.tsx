import React from 'react';
import SelectMonth from './SelectMonth';

interface Props {
  year: number;
  selectedMonth: number;
  monthNames: string[];
  handlePrevYear: () => void;
  handleNextYear: () => void;
  handleMonthChange: (month: number) => void;
  handleTodayClick: () => void;
}

const CalendarHeader: React.FC<Props> = ({
  year, selectedMonth, monthNames, handlePrevYear, handleNextYear, handleMonthChange, handleTodayClick
}) => {
  const monthOptions = monthNames.map((m, idx) => ({ name: m, value: `${idx}` }));

  return (
    <div className="sticky -top-px z-50 w-full rounded-t-2xl bg-white px-5 pt-7 sm:px-8 sm:pt-8">
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <SelectMonth value={selectedMonth} options={monthOptions} onChange={handleMonthChange} />
          <button onClick={handleTodayClick} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 lg:px-5 lg:py-2.5">Today</button>
          <button className="whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:rounded-xl lg:px-5 lg:py-2.5">+ Add Event</button>
        </div>
        <div className="flex w-fit items-center justify-between">
          <button onClick={handlePrevYear} className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2">
            <svg className="size-5 text-slate-800" width="24" height="24" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/></svg>
          </button>
          <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">{year}</h1>
          <button onClick={handleNextYear} className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2">
            <svg className="size-5 text-slate-800" width="24" height="24" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <div className="grid w-full grid-cols-7 justify-between text-slate-500">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => <div key={i} className="w-full border-b border-slate-200 py-2 text-center font-semibold">{d}</div>)}
      </div>
    </div>
  );
};

export default CalendarHeader;
