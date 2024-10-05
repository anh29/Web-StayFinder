import { Box, Text, Image, Button, Spinner, Flex, Heading, Grid } from "@chakra-ui/react";
import { fetchRoomsByHotelId } from "api/api";
import { fetchEnhancedHotelById } from "api/fetchData";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Room } from "types/data";
import { EnhancedHotel } from "types/enhancedData";

const HotelDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();
  const hotelId = queryParams.get("id"); 
  const [hotel, setHotel] = useState<EnhancedHotel | null>(null); 
  const [rooms, setRooms] = useState<Room[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const loadHotel = async () => {
      setLoading(true); 
      try {
        const hotels = await fetchEnhancedHotelById(hotelId); 
        setHotel(hotels || null); 

        if (hotels) {
          const allRooms = await fetchRoomsByHotelId(hotelId); 
          const hotelRooms = allRooms.filter(room => room.hotelId === hotelId); 
          setRooms(hotelRooms);
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

  if (error) {
    return (
      <Box textAlign="center" p={5}>
        <Text fontSize="xl" color="red.500">{error}</Text>
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

  const handleClick = (id: string) => {
    history.push(`/room?id=${id}`);
  };

  return (
    <Box w="100%" maxW="1300px" p={4} mx="auto" bgGradient="linear(to-br, teal.500, purple.500)" borderRadius="lg" boxShadow="2xl" overflow="hidden">
      <Flex direction={{ base: "column", md: "row" }} mb={8}>
        <Box flex="1" position="relative">
          <Image
            src={hotel.images[0] || `https://picsum.photos/800/400?random=${hotel.hotelId}`}
            alt={hotel.name}
            objectFit="cover"
            borderRadius="lg"
            mb={4}
            height={{ base: "200px", md: "400px" }} 
            width="100%"
            transition="transform 0.5s"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Box>
        <Box flex="1" p={4} color="white" bg="rgba(0, 0, 0, 0.5)" borderRadius="lg" boxShadow="md" ml={{ md: 4 }} position="relative">
          <Text fontSize="4xl" fontWeight="bold" textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)">{hotel.name}</Text>
          <Text fontSize="lg" mt={2} color="gray.300">{hotel.description || "No description available."}</Text>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">Location:</Text>
            <Text>{`${hotel.location.address}, ${hotel.location.city}, ${hotel.location.country}`}</Text>
          </Box>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">Facilities:</Text>
            <Text>{hotel.facilities.join(", ") || "No facilities listed."}</Text>
          </Box>
          <Button 
            mt={6} 
            colorScheme="teal" 
            onClick={() => window.history.back()} 
            borderRadius="full"
            _hover={{ bg: 'purple.400', transform: 'scale(1.05)' }}
            transition="0.3s"
          >
            Go Back
          </Button>
        </Box>
      </Flex>

      {/* Rooms Section */}
      <Box>
        <Heading size="lg" mb={4} color="white">Rooms</Heading>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <Box key={room.roomId} p={4} onClick={() => handleClick(room.roomId)} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md" transition="transform 0.2s" _hover={{ transform: 'scale(1.05)' }}>
                <Text fontSize="xl" fontWeight="bold">{room.type}</Text>
                <Text>Price: ${room.price} {room.currency}</Text>
                <Text>Capacity: {room.capacity} {room.capacity > 1 ? 'people' : 'person'}</Text>
                <Text>Amenities: {room.amenities.join(", ") || "No amenities listed."}</Text>
              </Box>
            ))
          ) : (
            <Text color="white">No rooms available for this hotel.</Text>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HotelDetail;
