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
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const confirmBooking = () => {
    toast({
      title: "Booking Successful!",
      description: `You have booked the ${room.type} for €${room.price} per night.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
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
          >
            Prev
          </Button>
          <Button
            position="absolute"
            top="50%"
            right="10px"
            colorScheme="teal"
            onClick={nextImage}
            transform="translateY(-50%)"
          >
            Next
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

      {/* Booking Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Your Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to book the {room.type} for €{room.price} per night?</Text>
          </ModalBody>
          <Button colorScheme="teal" onClick={confirmBooking} m={4}>
            Confirm
          </Button>
          <Button onClick={() => setIsModalOpen(false)} m={4}>
            Cancel
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default RoomDetailPage;
