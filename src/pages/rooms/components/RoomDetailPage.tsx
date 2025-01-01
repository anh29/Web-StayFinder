import React, { useEffect, useState } from "react";
import { Box, Container, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import RoomDetail from "./RoomDetail";
import HotelInfo from "./HotelInfo";
import { getRoomDetails } from "api/roomService";
import { Room } from "types/room";
import { Hotel } from "types/hotel";
import { Review } from "types/user";
import Reviews from "./Reviews";

const RoomDetailPage = () => {
  const { search } = useLocation();
  const roomId = new URLSearchParams(search).get("id");
  const [room, setRoom] = useState<Room>(null);
  const [hotel, setHotel] = useState<Hotel | string>(null);
  const [reviews, setReviews] = useState<Review[] | string>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const fetchedRoom = await getRoomDetails(roomId);

        if (typeof(fetchedRoom) === "string") {
          setError("Room, Hotel or Reviews details are missing.");
          return;
        }

        setRoom(fetchedRoom.room);
        setHotel(fetchedRoom.hotel);
        setReviews(fetchedRoom.reviews);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
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
      <Box display={{ md: "flex", base: "block"}} gap="50px">
        <RoomDetail room={room} />
        <Reviews reviews={reviews} />
      </Box>
        <HotelInfo hotel={hotel} />
    </Container>
  );
};

export default RoomDetailPage;
