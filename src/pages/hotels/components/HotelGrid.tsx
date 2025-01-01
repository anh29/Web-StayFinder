import { SimpleGrid, Box, Image, Text, Badge, HStack, keyframes } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FilterOptions } from "types/config/filter";
import { Hotel } from "types/hotel";

const HotelGrid = ({ hotels, filter }: { hotels: Hotel[], filter: Partial<FilterOptions> }) => {
  const history = useHistory();

  const hoverEffect = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  const handleCardClick = (hotelId: string) => {
    history.push(`/hotel?id=${hotelId}`);
  };

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
      {hotels.map((hotel) => (
        <Box
          key={hotel._id}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
          _hover={{
            boxShadow: '2xl',
            animation: `${hoverEffect} 0.6s ease-in-out`,
            cursor: 'pointer',
            transform: 'translateY(-5px)',
          }}
          position="relative"
          bg="white"
          border="2px solid teal"
          onClick={() => handleCardClick(hotel._id)}
        >
          <Image 
            src={hotel.media[0]} 
            alt={hotel.name} 
            objectFit="cover" 
            h={{ base: "150px", sm: "200px", md: "250px" }} 
            w="100%" 
            borderTopRadius="lg"
            filter="brightness(0.8)"
            _hover={{ filter: "brightness(1)" }}
          />
          <Box p={4} textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="teal.800" textShadow="0 1px 1px rgba(0, 0, 0, 0.5)">
              {hotel.name}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2} noOfLines={2}>
              {hotel.location.city}, {hotel.location.country}
            </Text>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Rating: {hotel.rating.toFixed(1)} ⭐
            </Text>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Check-in: {filter.checkInDate} | Check-out: {filter.checkOutDate}
            </Text>
            <HStack mt={2} spacing={1} wrap="wrap" justify="center" gap={'10px'}>
              {hotel.amenities.slice(0, 4).map((facility, index) => (
                <Badge key={index} colorScheme="teal" borderRadius="full" px={2} py={1} fontSize={{ base: "sm", md: "md" }}>
                  {facility}
                </Badge>
              ))}
              {hotel.amenities.length > 4 && (
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.500" ml={2}>
                  +{hotel.amenities.length - 4}
                </Text>
              )}
            </HStack>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default HotelGrid;
