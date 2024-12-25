import React, { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  Text,
  Box,
  Button,
  VStack,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { Booking } from "types/data"; // Ensure correct types are imported
import { fetchRoomById } from "api/api";
import BookingModal from "components/booking/BookingModal";

const RoomDetailPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("id");
  const history = useHistory();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const fetchedRoom = await fetchRoomById(roomId);
        setRoom(fetchedRoom);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to fetch room details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getRoomDetails();
  }, [roomId]);

  const handleBooking = () => {
    setIsModalOpen(true);
  };

  const confirmBooking = async (booking: Booking) => {
    try {
      // Simulate booking logic here, e.g., API call
      toast({
        title: "Booking Successful!",
        description: `You have booked the ${room.type} for €${room.price} per night.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Additional logic for confirmed booking
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
  };
  const handleRedirect = () => {
    history.push("/history");
  };
  if (loading) {
    return (
      <Container centerContent>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="start">
        <Heading>{room.type}</Heading>
        <Box position="relative" width="full" height="400px" overflow="hidden">
          <Image
            src={room.images[currentIndex]}
            alt={room.type}
            borderRadius="md"
            boxSize="full"
            objectFit="cover"
          />
          <Button
            position="absolute"
            top="50%"
            left="10px"
            colorScheme="teal"
            onClick={prevImage}
            transform="translateY(-50%)"
            isDisabled={room.images.length <= 1}
          >
            &lt;
          </Button>
          <Button
            position="absolute"
            top="50%"
            right="10px"
            colorScheme="teal"
            onClick={nextImage}
            transform="translateY(-50%)"
            isDisabled={room.images.length <= 1}
          >
            &gt;
          </Button>
        </Box>
        <Text fontSize="xl" color="gray.600">
          Price: €{room.price} / night
        </Text>
        <Text fontSize="lg" color="gray.800">
          Capacity: {room.capacity} guests
        </Text>
        <Text fontSize="md" color="gray.600" mt={4}>
          Amenities: {room.amenities.join(", ")}
        </Text>
        <Button colorScheme="teal" size="lg" onClick={handleBooking}>
          Book Now
        </Button>
      </VStack>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={{ type: room.type, price: room.price, currency: "€" }}
        onConfirm={confirmBooking}
        onRedirect={handleRedirect}
      />
    </Container>
  );
};

export default RoomDetailPage;
