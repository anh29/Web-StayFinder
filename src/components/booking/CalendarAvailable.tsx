import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "react-calendar/dist/Calendar.css";
import { AvailableDate } from "types/room";

dayjs.extend(isSameOrAfter);

interface CalendarAvailableProps {
  availabilityRanges: AvailableDate[];
  onDateChange: (range: [Date, Date]) => void;
}

const CalendarAvailable: React.FC<CalendarAvailableProps> = ({
  availabilityRanges,
  onDateChange,
}) => {
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle date change when selecting a range
  const handleDateChange = (value: Date | Date[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setSelectedRange(value as [Date, Date]);
      onOpen();
      onDateChange(value as [Date, Date]);
    }
  };

  // Check if the date is within any of the availability ranges
  const isDateInRange = (date: Date): boolean => {
    return availabilityRanges.some(
      (range: AvailableDate) =>
        dayjs(date).isSameOrAfter(dayjs(range.startDate).subtract(1, "day")) &&
        dayjs(date).isBefore(dayjs(range.endDate).subtract(1, "day"))
    );
  };

  // Disable tiles that are not in range or are in the past
  const tileDisabled = ({ date }: { date: Date }) => {
    const today = new Date();
    return !isDateInRange(date) || dayjs(date).isBefore(dayjs(today).startOf('day'));
  };

  return (
    <Box textAlign="center" py={5} px={{ base: 2, md: 5 }}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Select Your Stay Dates
      </Text>
      <Box
        mx="auto"
        maxW="600px"
        placeItems="center"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="sm"
        overflow="hidden"
        p={3}
      >
        <Calendar
          onChange={handleDateChange}
          selectRange={true}
          tileDisabled={tileDisabled}
        />
      </Box>
      {selectedRange && isOpen && (
        <Box
          mt={6}
          p={4}
          bg="gray.100"
          borderRadius="md"
          boxShadow="base"
          maxW="400px"
          mx="auto"
        >
          <VStack spacing={3} align="start">
            <Alert status="info" variant="subtle">
              <AlertIcon />
              <AlertDescription>
                You selected the following date range:
              </AlertDescription>
            </Alert>
            <Text fontSize="md">
              You will start your stay at <strong>noon</strong> on{" "}
              {dayjs(selectedRange[0]).format("MMM D, YYYY")} and check out at{" "}
              <strong>noon</strong> on {dayjs(selectedRange[1]).add(1, "day").format("MMM D, YYYY")}.
            </Text>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={onClose}
              alignSelf="center"
            >
              Confirm
            </Button>
          </VStack>
        </Box>
      )}
      {!selectedRange && (
        <Text mt={4} fontSize="sm" color="gray.500">
          Select a date range to see more details.
        </Text>
      )}
    </Box>
  );
};

export default CalendarAvailable;
