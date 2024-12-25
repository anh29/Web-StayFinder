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
  Image, // Import the Image component
  Button,
  useToast,
} from "@chakra-ui/react";
import { fetchEnhancedBookingsByUserId } from "api/fetchData";
import { EnhancedBooking } from "types/enhancedData";
import { FaBed, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

const OrderHistory: React.FC<{ userId: string }> = ({ userId = "u001" }) => {
  const [bookings, setBookings] = useState<EnhancedBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chakra UI toast hook
  const toast = useToast();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const userBookings = await fetchEnhancedBookingsByUserId(userId);
        setBookings(userBookings);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [userId]);

  const bgColor = useColorModeValue("#f9f9f9", "#1a202c"); // Soft light and dark mode backgrounds
  const cardBgColor = "#0ab3c4"; // Main color for cards
  const textColor = useColorModeValue("gray.800", "white");
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");

  // Function to check if review is allowed (within one week of checkout)
  const isReviewAllowed = (checkOutDate: string) => {
    const checkout = new Date(checkOutDate);
    const now = new Date();
    const oneWeekAfterCheckout = new Date(checkout.setDate(checkout.getDate() + 7));
    return now <= oneWeekAfterCheckout;
  };
  const canWriteReview = (checkInDate: string, checkOutDate: string) => {
    const checkin = new Date(checkInDate);
    const now = new Date();
    
    // Check if the current date is before check-in
    if (now < checkin) {
      toast({
        title: "Not Checked-in Yet!",
        description: "You cannot write a review before check-in.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    
    // Check if the current date is within 1 week after checkout
    if (!isReviewAllowed(checkOutDate)) {
      toast({
        title: "Review Time Not Valid.",
        description: "You can only review within 1 week after checking out.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }    

    return true; // Review is allowed
  };

  // Function to handle Review button click
  const handleReviewClick = (checkInDate: string, checkOutDate: string) => {
    if (canWriteReview(checkInDate, checkOutDate)) {
      // Logic to show review form or navigate to the review page
      console.log("Review form will be displayed.");
    }
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
              key={booking.bookingId}
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
              <Image
                src={booking.roomImage} // Use the room image from the enhanced booking
                alt={`${booking.roomType} Image`}
                borderTopRadius="lg"
                objectFit="cover"
                height="200px" // Fixed height for consistency
                width="100%"
              />
              <CardHeader pb={0}>
                <Heading size="md" color={textColor} fontWeight="bold">
                  {booking.hotelName}
                </Heading>
                <Text fontSize="sm" color={mutedTextColor}>
                  {booking.roomType}
                </Text>
              </CardHeader>
              <CardBody>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaCalendarAlt} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Check-in:
                  </Text>
                  <Text color={textColor} ml={1}>
                    {booking.checkInDate}
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaCalendarAlt} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Check-out:
                  </Text>
                  <Text color={textColor} ml={1}>
                    {booking.checkOutDate}
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaBed} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Guests:
                  </Text>
                  <Text color={textColor} ml={1}>
                    {booking.totalGuests}
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaMoneyBillWave} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Total Price:
                  </Text>
                  <Text color={textColor} ml={1}>
                    {`${booking.totalPrice} ${booking.currency}`}
                  </Text>
                </Box>
                <Text color={textColor}>
                  Status: <strong>{booking.status}</strong>
                </Text>

                {/* Review Button */}
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={() => handleReviewClick(booking.checkInDate, booking.checkOutDate)}
                >
                  Write a Review
                </Button>
              </CardBody>
            </Card>
          ))}

<Card
              key={'11'}
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
              <Image
                src={"https://images.unsplash.com/photo-1631049552057-403cdb8f0658?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D"} // Use the room image from the enhanced booking
                alt={`Image`}
                borderTopRadius="lg"
                objectFit="cover"
                height="200px" // Fixed height for consistency
                width="100%"
              />
              <CardHeader pb={0}>
                <Heading size="md" color={textColor} fontWeight="bold">
                Grand Palace Hotel
                </Heading>
                <Text fontSize="sm" color={mutedTextColor}>
                Standard Room
                </Text>
              </CardHeader>
              <CardBody>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaCalendarAlt} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Check-in:
                  </Text>
                  <Text color={textColor} ml={1}>
                    2024-12-01
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaCalendarAlt} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Check-out:
                  </Text>
                  <Text color={textColor} ml={1}>
                    2024-12-03
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaBed} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Guests:
                  </Text>
                  <Text color={textColor} ml={1}>
                    2
                  </Text>
                </Box>
                <Box mb={4} display="flex" alignItems="center">
                  <Icon as={FaMoneyBillWave} color={cardBgColor} boxSize={5} />
                  <Text ml={2} display="inline" fontWeight="bold">
                    Total Price:
                  </Text>
                  <Text color={textColor} ml={1}>
                    120 000 VND
                  </Text>
                </Box>
                <Text color={textColor}>
                  Status: Deposit
                </Text>
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={() => handleReviewClick( "2024-12-01", "2024-12-03")}
                >
                  Write a Review
                </Button>
              </CardBody>
            </Card>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default OrderHistory;
