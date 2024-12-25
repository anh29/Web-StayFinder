// RoomDetailPage.tsx
import React, { useEffect, useState } from "react";
import { Box, Container, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { fetchRoomById, fetchHotelById, fetchReviewsByRoomId } from "api/api";
import { Booking } from "types/data";
import RoomDetail from "./RoomDetail";
import HotelInfo from "./HotelInfo";
import Reviews from "./Reviews";

const RoomDetailPage = () => {
  const { search } = useLocation();
  const roomId = new URLSearchParams(search).get("id");
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const fetchedRoom = await fetchRoomById(roomId);
        const fetchedHotel = await fetchHotelById(fetchedRoom.hotelId);
        const fetchedReviews = await fetchReviewsByRoomId(roomId);

        if (!fetchedRoom || !fetchedHotel || !fetchedReviews) {
          setError("Room, Hotel or Reviews details are missing.");
          return;
        }

        setRoom(fetchedRoom);
        setHotel(fetchedHotel);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to fetch room details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getRoomDetails();
  }, [roomId]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text color="red.500" fontSize="lg">{error}</Text>
      </Container>
    );
  }

  if (!room || !hotel) {
    return (
      <Container>
        <Text color="gray.600" fontSize="lg">No room or hotel details available.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <Box display="flex" gap="50px">
        <RoomDetail room={room} />
        <Reviews reviews={reviews} />
      </Box>
        <HotelInfo hotel={hotel} />
    </Container>
  );
};

export default RoomDetailPage;
