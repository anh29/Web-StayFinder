import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  selectedDate: Date | [Date, Date] | null;
  onDateChange: (date: Date | [Date, Date] | null) => void;
  label: string;
  isRange?: boolean;
  minDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, label, isRange = false, minDate }) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return (
    <FormControl display='flex' >
      <FormLabel w='160px'>{label}</FormLabel>
      <Box border={'1px solid black'} p={'4px 8px 0px 8px'}>
        <DatePicker
          selected={Array.isArray(selectedDate) ? selectedDate[0] : selectedDate}
          onChange={(date: Date | [Date, Date] | null) => onDateChange(date)}
          startDate={Array.isArray(selectedDate) ? selectedDate[0] : undefined}
          endDate={Array.isArray(selectedDate) ? selectedDate[1] : undefined}
          {...(isRange && { selectsRange: true })}
          filterDate={(date) => date >= currentDate && (!minDate || date >= minDate)}
          placeholderText={`Select ${label.toLowerCase()}`}
        />
      </Box>
    </FormControl>
  );
};

export default Calendar;
