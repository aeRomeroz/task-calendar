'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DayActivity } from '../../types/types';
import CalendarHeader from './CalendarHeader';
import CalendarWeek from './CalendarWeek';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface ContinuousCalendarProps {
  onClick?: (_day:number, _month: number, _year: number) => void;
}

const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ onClick }) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [activeDays, setActiveDays] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  async function fetchMonth(year: number, month: number) {
    try {
      const res = await fetch(`http://localhost:5291/api/calendar/${year}/${month}`);
      if (!res.ok) throw new Error('Error al obtener actividades');
      const data: DayActivity[] = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async function addActivity(day: number, month: number, year: number, trainingDone: boolean) {
    await fetch('http://localhost:5291/api/calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day, month, year, trainingDone })
    });
  }

  const handleToggleTraining = (day: number, month: number, year: number) => {
    const currentState = activeDays[`${month}-${day}`] ?? false;
    addActivity(day, month, year, !currentState);
    setActiveDays(prev => ({ ...prev, [`${month}-${day}`]: !currentState }));
  };

  const scrollToDay = (monthIndex: number, dayIndex: number) => {
    const targetIndex = dayRefs.current.findIndex(ref => ref && ref.getAttribute('data-month') === `${monthIndex}` && ref.getAttribute('data-day') === `${dayIndex}`);
    const targetElement = dayRefs.current[targetIndex];
    if (!targetElement) return;

    const container = document.querySelector('.calendar-container');
    const elementRect = targetElement.getBoundingClientRect();
    const offsetFactor = window.matchMedia('(min-width: 1536px)').matches ? 3 : 2.5;

    if (container) {
      const containerRect = container.getBoundingClientRect();
      const offset = elementRect.top - containerRect.top - (containerRect.height / offsetFactor) + (elementRect.height / 2);
      container.scrollTo({ top: container.scrollTop + offset, behavior: 'smooth' });
    } else {
      const offset = window.scrollY + elementRect.top - (window.innerHeight / offsetFactor) + (elementRect.height / 2);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const handlePrevYear = () => setYear(prev => prev - 1);
  const handleNextYear = () => setYear(prev => prev + 1);
  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };
  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };
  const handleDayClick = (day: number, month: number, year: number) => {
    if (onClick) {
      onClick(month < 0 ? 11 : month, day, month < 0 ? year - 1 : year);
    }
  };

  useEffect(() => {
    const loadMonthActivities = async () => {
      setLoading(true);
      const data = await fetchMonth(year, selectedMonth);
      const newActiveDays: Record<string, boolean> = {};
      data.forEach(a => { newActiveDays[`${a.month}-${a.day}`] = a.trainingDone; });
      setActiveDays(newActiveDays);
      setLoading(false);
    };
    loadMonthActivities();
  }, [year, selectedMonth]);

  const generateCalendar = useMemo(() => {
    const daysInYear: { month: number, day: number }[] = [];
    const startDay = new Date(year, 0, 1).getDay();
    for (let i = 0; i < startDay; i++) daysInYear.push({ month: -1, day: 32 - startDay + i });
    for (let m = 0; m < 12; m++) {
      const days = new Date(year, m + 1, 0).getDate();
      for (let d = 1; d <= days; d++) daysInYear.push({ month: m, day: d });
    }
    const lastWeek = daysInYear.length % 7;
    if (lastWeek > 0) for (let d = 1; d <= 7 - lastWeek; d++) daysInYear.push({ month: 0, day: d });

    const weeks = [];
    for (let i = 0; i < daysInYear.length; i += 7) weeks.push(daysInYear.slice(i, i + 7));
    return weeks.map((week, idx) => (
      <CalendarWeek
        key={idx}
        week={week}
        year={year}
        activeDays={activeDays}
        dayRefs={dayRefs}
        handleDayClick={handleDayClick}
        handleToggleTraining={handleToggleTraining}
      />
    ));
  }, [year, activeDays]);

  return (
    <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 shadow-xl relative">
      {loading && <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center z-50">Loading...</div>}
      <CalendarHeader
        year={year}
        selectedMonth={selectedMonth}
        monthNames={monthNames}
        handlePrevYear={handlePrevYear}
        handleNextYear={handleNextYear}
        handleMonthChange={handleMonthChange}
        handleTodayClick={handleTodayClick}
      />
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">{generateCalendar}</div>
    </div>
  );
};

export default ContinuousCalendar;
