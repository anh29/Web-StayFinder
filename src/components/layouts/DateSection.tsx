import { Stack } from "@chakra-ui/react";
import Calendar from "components/elements/Calender";
import React from "react";

interface DateSelectionProps {
  checkInDate: Date | null;
  setCheckInDate: (date: Date | null) => void;
  checkOutDate: Date | null;
  setCheckOutDate: (date: Date | null) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate }) => {
  const handleCheckInChange = (date: Date | [Date, Date] | null) => {
    if (Array.isArray(date)) {
      setCheckInDate(date[0]);
    } else {
      setCheckInDate(date);
    }
   
    if (checkOutDate && date instanceof Date && date > checkOutDate) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutChange = (date: Date | [Date, Date] | null) => {
    if (Array.isArray(date)) {
      setCheckOutDate(date[0]);
    } else if (date instanceof Date) {
     
      if (!checkInDate || date >= checkInDate) {
        setCheckOutDate(date);
      }
    }
  };

  return (
    <Stack spacing={4}>
      <Calendar
        selectedDate={checkInDate}
        onDateChange={handleCheckInChange}
        label="Check-In Date"
        minDate={new Date()}
      />
      <Calendar
        selectedDate={checkOutDate}
        onDateChange={handleCheckOutChange}
        label="Check-Out Date"
        isRange={false}
        minDate={checkInDate}
      />
    </Stack>
  );
};

export default DateSelection;
