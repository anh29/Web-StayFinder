import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Text,
  Heading,
  Alert,
  AlertIcon,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Icon,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { getTransactionHistory } from "api/bookingService";
import { OrderHistory } from "types/order";
import ReviewModal from "./ReviewsModal";

const OrderHistoryComponent = () => {
  const [bookings, setBookings] = useState<OrderHistory["data"]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); // For ReviewModal
  const [selectedOrder, setSelectedOrder] = useState<OrderHistory["data"][0] | null>(null); // For ReviewModal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const { data } = await getTransactionHistory();
        setBookings(data);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const bgColor = useColorModeValue("#f9f9f9", "#1a202c");
  const cardBgColor = "#0ab3c4";
  const textColor = useColorModeValue("gray.800", "white");
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");

  // Check if review is allowed (within one week of checkout)
  const isReviewAllowed = (checkOutDate: string) => {
    const checkout = new Date(checkOutDate);
    const now = new Date();
    const oneWeekAfterCheckout = new Date(checkout.setDate(checkout.getDate() + 7));
    return true;
  };

  const handleReviewClick = (order: OrderHistory["data"][0]) => {
    const checkin = new Date(order.checkInDate);
    const now = new Date();

    if (now < checkin) {
      toast({
        title: "Not Checked-in Yet!",
        description: "You cannot write a review before check-in.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!isReviewAllowed(order.checkOutDate)) {
      toast({
        title: "Review Time Not Valid.",
        description: "You can only review within 1 week after checking out.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setSelectedRoomId(order.roomId?._id); // Open the modal
    setSelectedOrder(order); // Store the selected order details
  };

  const handleReviewSubmitted = () => {
    toast({
      title: "Review Submitted",
      description: "Thank you for your review!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSelectedRoomId(null); // Close the modal
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg={bgColor}
      >
        <Spinner size="xl" color={cardBgColor} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mb={4} variant="left-accent" colorScheme="red">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box p={6} minH="500px" bg={bgColor} borderRadius="md" boxShadow="lg">
      <Heading mb={2} textAlign="center" color={textColor} fontSize="2xl">
        Order History
      </Heading>
      {bookings.length === 0 ? (
        <Text textAlign="center" color={textColor}>
          No bookings found.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {bookings.map((booking) => (
            <Card
              key={booking.transactionId}
              variant="outline"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              bg="white"
              color={textColor}
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "lg",
                borderColor: cardBgColor,
              }}
            >
              <CardHeader pb={0}>
                <Heading size="md" color={textColor} fontWeight="bold">
                  {booking.hotelName}
                </Heading>
                <Text fontSize="sm" color={mutedTextColor}>
                  Room ID: {booking.roomId?._id}
                </Text>
              </CardHeader>
              <CardBody>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaCalendarAlt} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Check-in:
                  </Text>
                  <Text color={textColor} ml={1}>
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaCalendarAlt} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Check-out:
                  </Text>
                  <Text color={textColor} ml={1}>
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaMoneyBillWave} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Total Price:
                  </Text>
                  <Text color={textColor} ml={1}>
                    {`${booking.amount.toLocaleString()} VND`}
                  </Text>
                </Box>
                <Text color={textColor}>
                  Status: <strong>{`${booking.paymentMethod === 50 ? "deposit 50%" : booking.status}`}</strong>
                </Text>
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={() => handleReviewClick(booking)}
                  isDisabled={booking.isReview}
                >
                  {!booking.isReview ? "View a Review" : "Reviewed"}
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
      {selectedRoomId && selectedOrder && (
        <ReviewModal
          roomId={selectedRoomId}
          orderDetails={{
            hotelName: selectedOrder.hotelName,
            checkInDate: selectedOrder.checkInDate,
            checkOutDate: selectedOrder.checkOutDate,
          }}
          isOpen={!!selectedRoomId}
          onClose={() => setSelectedRoomId(null)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </Box>
  );
};

export default OrderHistoryComponent;
