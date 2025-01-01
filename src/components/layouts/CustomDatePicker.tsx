import React, { useState } from "react";
import { Box, Input, HStack, Tooltip } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DateRange {
  from: Date | null;
  to?: Date | null;
}

interface CustomDatePickerProps {
  value: DateRange;
  onChange: (dates: DateRange) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
}) => {
  const [activeInput, setActiveInput] = useState<"checkIn" | "checkOut" | null>(
    null
  );

  const formatDate = (date: Date | null) => {
    if (!date) return "";

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().slice(0, 10);
  };

  const today = new Date();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;


    if (activeInput === "checkIn") {
      onChange({
        from: selectedDate,
        to: value.to && selectedDate > value.to ? null : value.to,
      });
    }

    if (activeInput === "checkOut" && value.from) {
      onChange({
        from: value.from,
        to: selectedDate,
      });
    }

    setActiveInput(null);
  };

  return (
    <Box position="relative">
      <HStack spacing={4}>
        <Tooltip
          label="Select check-in date"
          aria-label="Check-in date tooltip"
        >
          <Input
            placeholder="Check-in Date"
            value={formatDate(value.from)}
            onFocus={() => {
              console.log("Active Input: checkIn");
              setActiveInput("checkIn");
            }}
            readOnly
          />
        </Tooltip>

        <Tooltip
          label="Select check-out date"
          aria-label="Check-out date tooltip"
        >
          <Input
            placeholder="Check-out Date"
            value={formatDate(value.to)}
            onFocus={() => {
              console.log("Active Input: checkOut");
              setActiveInput("checkOut");
            }}
            readOnly
          />
        </Tooltip>
      </HStack>

      {activeInput && (
        <Box
          position="absolute"
          zIndex="10"
          bg="white"
          boxShadow="lg"
          mt={2}
          p={4}
          borderRadius="md"
          border="1px solid lightgray"
        >
          <DayPicker
            mode="single"
            selected={activeInput === "checkIn" ? value.from : value.to}
            onSelect={handleDateSelect}
            disabled={[
              { before: today },
              activeInput === "checkOut" && value.from
                ? { before: value.from }
                : undefined,
            ]}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomDatePicker;
