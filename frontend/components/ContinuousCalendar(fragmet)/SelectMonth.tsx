import React from 'react';

interface Option { name: string, value: string }
interface Props {
  value: number;
  options: Option[];
  onChange: (monthIndex: number) => void;
}

const SelectMonth: React.FC<Props> = ({ value, options, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(parseInt(e.target.value, 10))}
    className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
  >
    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
  </select>
);

export default SelectMonth;
