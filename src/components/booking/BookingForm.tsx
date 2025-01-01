import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Select,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import CalendarAvailable from "./CalendarAvailable";
import { Room } from "types/room";

interface BookingFormProps {
  room: Room;
  onSubmit: (data: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ room, onSubmit }) => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("fulfill");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const toast = useToast();

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      calculateBookingDetails();
    }
  }, [checkInDate, checkOutDate, paymentMethod]);

  const calculateBookingDetails = () => {
    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);

    const days =
      (checkOutDateObj.getTime() - checkInDateObj.getTime()) / (1000 * 3600 * 24);

    if (days > 0) {
      setTotalDays(days);
      let price = room.price * days;
      if (paymentMethod === "deposit") {
        price *= 0.5;
      }
      setTotalPrice(price);
    } else {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTotalDays(0);
      setTotalPrice(0);
    }
  };

  const handleDateChange = (range: [Date, Date]) => {
    setCheckInDate(range[0].toISOString().split("T")[0]);
    setCheckOutDate(range[1].toISOString().split("T")[0]);
  };

  const handleSubmit = () => {
    if (!checkInDate || !checkOutDate || !paymentMethod) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onSubmit({ checkInDate, checkOutDate, paymentMethod, totalDays, totalPrice });
  };

  return (
    <VStack spacing={6}>
      <CalendarAvailable availabilityRanges={room.availableDates} onDateChange={handleDateChange} />
      <Text fontSize="lg" fontWeight="bold">
        {room.roomType} - {room.price.toLocaleString()} VND per night
      </Text>
      <Divider />
      <HStack w="full" justifyContent="space-between">
        <Text fontWeight="medium">Guest Capacity:</Text>
        <Text>{room.capacity} guests ({Math.ceil(room.capacity / 2)} beds)</Text>
      </HStack>
      <FormControl isRequired>
        <FormLabel>Payment Method</FormLabel>
        <Select
          value={paymentMethod}
          placeholder="Select payment method"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="deposit">Pay 50% deposit</option>
          <option value="fulfill">Pay full</option>
        </Select>
      </FormControl>
      <HStack w="full" justifyContent="space-between">
        <Text>Total Days:</Text>
        <Text fontWeight="bold">{totalDays}</Text>
      </HStack>
      <HStack w="full" justifyContent="space-between">
        <Text>Total Price:</Text>
        <Text fontWeight="bold" color="teal.500">
          {totalPrice.toLocaleString()} VND
        </Text>
      </HStack>
      <Button colorScheme="teal" size="lg" w="full" onClick={handleSubmit}>
        Confirm Booking
      </Button>
    </VStack>
  );
};

export default BookingForm;
