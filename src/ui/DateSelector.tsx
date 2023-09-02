import React, { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface IDateSelectorProps {
  onDateChange: (formattedDate: string) => void;
}

function transformDate(date: Date) {
  const dateString = date.toLocaleDateString("en-GB");
  return dateString.split("/").reverse().join("-");
}

export function DateSelector({ onDateChange }: IDateSelectorProps) {
  const [value, onChange] = useState<Value>(new Date());
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    return new Date(today.getFullYear(), today.getMonth() , today.getDate()+1);
  }, [today]);
  const eoy = new Date(2023, 11, 31);

  useEffect(() => {
    if (value && value instanceof Date) {
      if (tomorrow <= value) {
        onDateChange(transformDate(value));
      }
    }
  }, [onDateChange, tomorrow, value]);

  return (
    <Calendar onChange={onChange} value={value} minDate={tomorrow} maxDate={eoy} />
  );
}
