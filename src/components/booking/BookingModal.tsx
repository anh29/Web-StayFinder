import React, { useState, useEffect } from "react";
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
import { Booking, Room } from "types/data";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import BookingReview from "./BookingReview";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room;
  onConfirm: (booking: Booking) => void;
  onRedirect: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  room,
}) => {
  const toast = useToast();
  const history = useHistory();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [timer, setTimer] = useState(120);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDate, setTotalDate] = useState(0);

  // Effect to update total price whenever dates or payment method changes
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkInDateObj = new Date(checkInDate);
      const checkOutDateObj = new Date(checkOutDate);

      // Calculate the number of nights
      const totalDays =
        (checkOutDateObj.getTime() - checkInDateObj.getTime()) /
        (1000 * 3600 * 24);
        setTotalDate(totalDays);
      if (totalDays <= 0) {
        toast({
          title: "Invalid Dates",
          description: "Check-out date must be after check-in date.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setTotalPrice(0);
        return;
      }

      let calculatedPrice = room.price * totalDays;

      // Adjust price based on payment method
      if (paymentMethod === "deposit") {
        calculatedPrice = calculatedPrice * 0.1; // 10% for deposit
      }

      setTotalPrice(calculatedPrice); // Update total price state
    }
  }, [checkInDate, checkOutDate, paymentMethod, room.price, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isProcessing && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      toast({
        title: "Booking expired",
        description: "The payment time has expired.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }

    return () => clearInterval(interval);
  }, [isProcessing, timer, onClose]);

  const handleNextStep = () => {
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

    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);

    // Calculate total days (including check-out day)
    const totalDays =
      (checkOutDateObj.getTime() - checkInDateObj.getTime()) /
      (1000 * 3600 * 24);

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

    // Additional checks for the room availability
    const cutoffDate = new Date("2024-11-23");
    if (room.roomId === "r101" && checkOutDateObj < cutoffDate) {
      toast({
        title: "Invalid Booking",
        description: "Sorry, this room is not available for booking right now.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsReviewing(true); // Go to review step
  };

  const handleConfirmBooking = () => {
    setIsPaymentVisible(true);
    setIsProcessing(true);

    setTimeout(() => {
      if (paymentMethod === "deposit") {
        setPaymentLink("https://payment-link-for-deposit");
      } else if (paymentMethod === "fulfill") {
        setPaymentLink("https://payment-link-for-full-payment");
      }
      setShowQRCode(true);
    }, 3000);
  };

  useEffect(() => {
    if (showQRCode) {
      const redirectTimeout = setTimeout(() => {
        onClose();
        history.push("/history");
      }, 5000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [showQRCode, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Your Stay</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!isProcessing && !isReviewing && (
            <>
              <Text fontSize="lg" mb={4}>
                {room.type} - 
                {room.price} {room.currency} per night
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
                  {room.capacity}{" "}
                  {room.capacity > 1 ? "guests - 2 beds" : "guest - 1 bed"}
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
              {/* Display calculated total price */}
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                Total Days: 
                {totalDate} 
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                Total Price: 
                {totalPrice} <span>{room.currency}</span>
              </Text>
            </>
          )}
          {isReviewing && (
            <BookingReview
              room={room}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              paymentMethod={paymentMethod}
              totalPrice={totalPrice} // Pass total price to the review step
              onBack={() => setIsReviewing(false)}
              onConfirm={handleConfirmBooking}
            />
          )}
          {isProcessing && !showQRCode && (
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">
                Processing Payment...
              </Text>
              <Text>Please wait while we confirm your payment via Momo.</Text>
              <Text mt={4}>
                Time remaining: {Math.floor(timer / 60)}:{timer % 60}
              </Text>
            </Box>
          )}

          {showQRCode && paymentLink && (
            <Box mt={4} textAlign="center">
              <Text fontSize="lg" mb={4}>
                Scan to Pay
              </Text>
              <QRCode value={paymentLink} size={256} />
              <Text mt={2}>
                Please scan the QR code to complete your payment.
              </Text>
              <Text mt={4}>
                Time remaining: {Math.floor(timer / 60)}:{timer % 60}
              </Text>
            </Box>
          )}
        </ModalBody>
        <Flex justifyContent="flex-end" p={4}>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          {!isReviewing && (
            <Button
              colorScheme="teal"
              onClick={handleNextStep}
              isDisabled={isProcessing}
            >
              Next
            </Button>
          )}
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
