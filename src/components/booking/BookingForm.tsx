import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Room } from "types/data";

interface BookingFormProps {
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
  setCheckInDate: (value: string) => void;
  setCheckOutDate: (value: string) => void;
  setPaymentMethod: (value: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  room,
  checkInDate,
  checkOutDate,
  paymentMethod,
  setCheckInDate,
  setCheckOutDate,
  setPaymentMethod,
}) => {
  const toast = useToast(); // Hook for toast notifications
  const [isSubmitting, setIsSubmitting] = useState(false); // Manage loading state

  const handleConfirmBooking = () => {
    // Simulating the room ID check
    if (room.roomId === "r101") {
      toast({
        title: "Not available now",
        description: "Sorry, this room is not available for booking right now.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      // Handle normal booking logic here
      toast({
        title: "Booking confirmed",
        description: `Your booking for room ${room.type} has been confirmed.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Text fontSize="lg" mb={4}>
        {room.type} - {room.currency}{room.price} per night
      </Text>
      <FormControl isRequired mb={4}>
        <FormLabel>Check-in Date</FormLabel>
        <Input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Check-out Date</FormLabel>
        <Input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Guest Count</FormLabel>
        <Text>
          {room.capacity} {room.capacity > 1 ? "guests - 2 beds" : "guest - 1 bed"}
        </Text>
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Payment Method</FormLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select a payment</option>
          <option value="deposit">Pay 10% deposit</option>
          <option value="fulfill">Pay full</option>
        </Select>
      </FormControl>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleConfirmBooking}
        isLoading={isSubmitting}
      >
        Confirm Booking
      </Button>
    </>
  );
};

export default BookingForm;
