import { SimpleGrid, Box, Image, Text, Badge, HStack, keyframes } from "@chakra-ui/react";
import { Hotel } from "types/data"; 
import { useHistory } from "react-router-dom";

const HotelGrid = ({ hotels }: { hotels: Hotel[] }) => {
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
          key={hotel.hotelId}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
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
          onClick={() => handleCardClick(hotel.hotelId)}
        >
          <Image 
            src={hotel.images[0]} 
            alt={hotel.name} 
            objectFit="cover" 
            h={{ base: "150px", sm: "200px", md: "250px" }} 
            w="100%" 
            borderTopRadius="lg"
            filter="brightness(0.8)"
            _hover={{ filter: "brightness(1)" }}
          />
          <Box p={4} textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="teal.800" textShadow="0 1px 3px rgba(0, 0, 0, 0.5)">
              {hotel.name}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2} noOfLines={2}>
              {hotel.location.address}, {hotel.location.city}, {hotel.location.country}
            </Text>
            <HStack mt={2} spacing={1} wrap="wrap" justify="center">
              {hotel.facilities.slice(0, 4).map((facility, index) => (
                <Badge key={index} colorScheme="teal" borderRadius="full" px={2} py={1} fontSize={{ base: "sm", md: "md" }}>
                  {facility}
                </Badge>
              ))}
              {hotel.facilities.length > 4 && (
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.500" ml={2}>
                  +{hotel.facilities.length - 4}
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
