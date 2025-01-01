import React from "react";
import {
  VStack,
  Text,
  HStack,
  Divider,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { increaseDay } from "./BookingModal";
import { bookRoom } from "../../api/bookingService";
import { useHistory } from "react-router-dom";

interface BookingDetailsProps {
  bookingData: {
    checkInDate: string;
    checkOutDate: string;
    totalDays: number;
    totalPrice: number;
    paymentMethod: string;
    roomId: string;
  };
  onCancel: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  bookingData,
  onCancel,
}) => {
  const {
    roomId,
    checkInDate,
    checkOutDate,
    totalDays,
    totalPrice,
    paymentMethod,
  } = bookingData;
  const toast = useToast();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    const paymentPercentage = paymentMethod === "deposit" ? 50 : 100;
    const updatedBookingData = {
      ...bookingData,
      checkOutDate: increaseDay(checkOutDate, 1),
      paymentMethod: paymentPercentage,
    };
  
    try {
      const order = await bookRoom(roomId, updatedBookingData);
      if (order.success && order.paymentUrl) {
        toast({
          title: "Redirecting to Payment",
          description: "You will be redirected to ZaloPay for payment.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        window.open(order.paymentUrl, "_blank");
        history.push("/history");
      } else {
        throw new Error("Failed to get payment URL");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description:
          "There was an error processing your payment. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };  

  isLoading && <Spinner />

  return (
    <VStack spacing={4}>
      <HStack w="full" justifyContent="space-between">
        <Text>Check-in Date:</Text>
        <Text fontWeight="bold">At noon {checkInDate}</Text>
      </HStack>
      <HStack w="full" justifyContent="space-between">
        <Text>Check-out Date:</Text>
        <Text fontWeight="bold">At noon {increaseDay(checkOutDate, 1)}</Text>
      </HStack>
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
      <HStack w="full" justifyContent="space-between">
        <Text>Payment Method:</Text>
        <Text fontWeight="bold">{paymentMethod}</Text>
      </HStack>
      <Divider />
      <HStack w="full" justifyContent="space-between" gap={16}>
        <Button colorScheme="gray" size="lg" w="full" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" size="lg" w="full" onClick={handlePayment}>
          Confirm & Pay
        </Button>
      </HStack>
    </VStack>
  );
};

export default BookingDetails;
