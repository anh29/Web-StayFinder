import { Box, Text, Flex, Grid, keyframes, Image, Button } from "@chakra-ui/react";
import { fetchEnhancedHotels } from "api/fetchData";
import { useEffect, useState } from "react";
import { EnhancedHotel } from "types/enhancedData";
import { Link, useHistory } from "react-router-dom";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export interface HotelsProps {}

export default function Hotels(props: HotelsProps) {
  const history = useHistory();
  const [hotels, setHotels] = useState<EnhancedHotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const fetchedHotels = await fetchEnhancedHotels();
        setHotels(fetchedHotels);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const handleClick = (hotelId: string) => {
    history.push(`/hotel?id=${hotelId}`);
  };

  return (
    <Box
      w="100%"
      maxW="1300px"
      p={4}
      bgGradient="linear(to-r, pink.400, blue.500)"
    >
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        textAlign="center"
        mb={8}
      >
        Welcome to Our Hotels!
      </Text>

      <Flex justifyContent="center" mb={6}>
        <Button
          colorScheme="teal"
          size="lg"
          fontWeight="bold"
          borderRadius="full"
          paddingX={8}
          paddingY={4}
          animation={`${bounce} 1s infinite`}
          _hover={{ bg: "teal.600" }}
        >
          <Link to='/rooms'>Find Your Stay</Link>
        </Button>
      </Flex>

      {loading ? (
        <Text fontSize="xl" color="white" textAlign="center">
          Loading hotels...
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {hotels.map((hotel) => (
            <Box
              key={hotel.hotelId}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              position="relative"
              transition="0.4s ease-in-out"
              _hover={{
                boxShadow: "2xl",
                transform: "scale(1.05) rotate(2deg)",
                filter: "brightness(1.1)",
              }}
              onClick={() => handleClick(hotel.hotelId)}
              cursor="pointer"
            >
              <Image
                src={
                  hotel.images[0] ||
                  `https://picsum.photos/300/200?random=${hotel.hotelId}`
                }
                alt={hotel.name}
                objectFit="cover"
                borderTopRadius="lg"
                transition="transform 0.4s ease-in-out"
              />
              <Box p={4}>
                <Text fontWeight="bold" fontSize="lg" color="teal.800">
                  {hotel.name}
                </Text>
                <Text color="gray.600" mt={1}>
                  {hotel.description ||
                    "A unique stay experience in the heart of the city!"}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
}
