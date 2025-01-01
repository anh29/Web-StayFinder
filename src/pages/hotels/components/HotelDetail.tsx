import { Box, Text, Spinner, Flex, Heading, Grid } from "@chakra-ui/react";
import { getHotelById } from "api/hotelService";
import Maps from "components/layouts/components/Maps";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Hotel } from "types/hotel";
import HotelCard from "components/elements/Card/HotelCard";
import { Room } from "types/room";

const HotelDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();
  const hotelId = queryParams.get("id");
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHotel = async () => {
      setLoading(true);
      try {
        const hotels = await getHotelById(hotelId);
        if (typeof hotels === 'string') {
          setError(hotels);
        } else {
          setHotel(hotels);
          setRooms(hotels.rooms || []);
        }
      } catch (err) {
        setError("Failed to fetch hotel details");
      } finally {
        setLoading(false);
      }
    };

    loadHotel();
  }, [hotelId]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="teal" />
      </Flex>
    );
  }
console.log('rooms', rooms)
  if (error) {
    return (
      <Box textAlign="center" p={5}>
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box textAlign="center" p={5}>
        <Text fontSize="xl">Hotel not found.</Text>
      </Box>
    );
  }

  const handleRoomClick = (id: string) => {
    history.push(`/room?id=${id}`);
  };

  return (
    <Box w="100%" maxW="1300px" mx="auto" p={{ base: 2, md: 4 }}>
      {/* Hotel Details Section */}
      <Box mb={{ base: 4, md: 8 }} p={{ base: 4, md: 6 }} bg="gray.100" borderRadius="xl" boxShadow="lg">
        <Heading
          size={{ base: "md", md: "lg" }}
          mb={{ base: 4, md: 6 }}
          color="teal.700"
          textAlign="center"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Hotel Details
        </Heading>
        <HotelCard
          hotel={hotel}
          isCarouselImage={true}
          wrapperProps={{
            mb: 4,
            transition: "transform 0.3s, box-shadow 0.3s",
            _hover: { transform: "scale(1.03)", boxShadow: "2xl" },
            overflow: "hidden",
            borderRadius: "lg",
            bg: "white",
            boxShadow: "xl",
          }}
          cardProps={{
            pt: 6,
            px: 6,
            borderRadius: "lg",
            fontSize: "30px",
          }}
          imageProps={{
            flexBasis: { base: "100%", md: "50%" },
            objectFit: "cover",
            width: { base: "100%", md: "400px" },
            height: { base: "200px", md: "300px" },
            borderTopLeftRadius: "lg",
            borderBottomLeftRadius: { base: "lg", md: "none" },
          }}
          carouselProps={{
            cardWidth: 400,
          }}
          contentProps={{
            flexBasis: { base: "100%", md: "50%" },
            p: 6,
            display: "flex",
            titleProps: {fontSize: "3xl"},
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        />
      </Box>

      {/* Rooms Section */}
      <Box mt={{ base: 4, md: 8 }}>
        <Heading size={{ base: "md", md: "lg" }} mb={{ base: 2, md: 4 }} color="teal.600">
          Available Rooms
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 4, md: 6 }}>
          {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
              <Box
                key={room._id}
                p={{ base: 2, md: 4 }}
                onClick={() => handleRoomClick(room._id)}
                borderWidth={1}
                borderRadius="lg"
                bg="white"
                boxShadow="lg"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              >
                <Text fontSize={{ base: "sm", md: "md" }} mt={2}>
                  Price: <strong>${room.price}</strong>VND
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  Capacity: {room.capacity}{" "}
                  {room.capacity > 1 ? "people" : "person"}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} mt={2}>
                  Amenities:{" "}
                  {room.amenities.join(", ") || "No amenities listed."}
                </Text>
              </Box>
            ))
          ) : (
            <Text color="gray.600">No rooms available for this hotel.</Text>
          )}
        </Grid>
      </Box>

      {/* Maps Section */}
      <Box mt={{ base: 4, md: 8 }}>
        <Heading size={{ base: "md", md: "lg" }} mb={{ base: 2, md: 4 }} color="teal.600">
          Location
        </Heading>
        <Maps lat={hotel.location.lat} lng={hotel.location.Lng} />
      </Box>
    </Box>
  );
};

export default HotelDetail;
