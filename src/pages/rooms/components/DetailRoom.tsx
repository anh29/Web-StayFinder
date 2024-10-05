import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { fetchRoomById } from "api/api";

const RoomDetailPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("id");

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const fetchedRoom = await fetchRoomById(roomId);
        setRoom(fetchedRoom);
      } catch (error) {
        setError("Failed to fetch room details.");
      } finally {
        setLoading(false);
      }
    };

    getRoomDetails();
  }, [roomId]);

  const handleBooking = () => {
    toast({
      title: "Booking Successful!",
      description: `You have booked the ${room.type} for €${room.price} per night.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
        <Image
          src={room.images[0]}
          alt={room.type}
          borderRadius="md"
          boxSize="full"
          objectFit="cover"
        />
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
    </Container>
  );
};

export default RoomDetailPage;
