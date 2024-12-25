import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex,
  useToast,
  Box,
} from "@chakra-ui/react";
import { Booking } from "types/data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    type: string;
    price: number;
    currency: string;
  };
  onConfirm: (booking: Booking) => void;
  onRedirect: () => void; // Callback for redirection
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  room,
  onConfirm,
  onRedirect, // Use the redirect prop
}) => {
  const toast = useToast();
  
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  const handleConfirmBooking = () => {
    // Validate input fields
    if (!checkInDate || !checkOutDate || !paymentMethod) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const totalDays = (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24);
    if (totalDays <= 0) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsPaymentVisible(true);
    
    // Automatically proceed to payment after 3 seconds
    setTimeout(() => {
      handlePayment();
    }, 3000);
  };

  const handlePayment = () => {
    const totalDays = (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24);
    const totalPrice = room.price * totalDays;

    const newBooking: Booking = {
      bookingId: Math.random().toString(36).substr(2, 9),
      userId: "exampleUserId",
      hotelId: "exampleHotelId",
      roomId: "exampleRoomId",
      checkInDate,
      checkOutDate,
      totalPrice,
      currency: room.currency,
      status: "confirmed",
    };

    // Simulate payment processing
    toast({
      title: "Payment Successful!",
      description: `You have successfully booked the ${room.type} for ${room.currency}${totalPrice} total.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Redirect after 5 seconds
    setTimeout(() => {
      onConfirm(newBooking); // Pass the new booking to the parent component
      onRedirect(); // Call redirect function
      onClose(); // Close the modal
    }, 5000); // Wait for 5 seconds before redirecting
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Your Stay</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
            <Select value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Payment Method</FormLabel>
            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">Select a payment</option>
              <option value="deposit">Pay 10% deposit</option>
              <option value="fulfill">Pay full</option>
            </Select>
          </FormControl>

          {isPaymentVisible && (
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">Processing Payment...</Text>
              <Text>Please wait while we confirm your payment via Momo.</Text>
            </Box>
          )}
        </ModalBody>
        <Flex justifyContent="flex-end" p={4}>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
