import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Grid, Button, keyframes } from "@chakra-ui/react";
import { fetchEnhancedHotels } from "api/fetchData";
import { EnhancedHotel } from "types/enhancedData";
import { Link, useHistory } from "react-router-dom";
import HotelCard from "components/elements/Card/HotelCard";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export interface HotelsProps {}

const Hotels: React.FC<HotelsProps> = () => {
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
          <Link to="/rooms">Find Your Stay</Link>
        </Button>
      </Flex>

      {loading ? (
        <Text fontSize="xl" color="white" textAlign="center">
          Loading hotels...
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.hotelId}
              hotel={hotel}
              handleClick={() => handleClick(hotel.hotelId)}
              cardProps={{
                borderRadius: "lg",
                boxShadow: "lg",
                bg: "white",
                h: "340px",
                position: "relative",
                transition: "0.4s ease-in-out",
                _hover: {
                  boxShadow: "2xl",
                  transform: "scale(1.05) rotate(2deg)",
                  filter: "brightness(1.1)",
                },
                cursor: "pointer",
              }}
              imageProps={{
                src:
                  hotel.images[0] ||
                  `https://picsum.photos/300/200?random=${hotel.hotelId}`,
                alt: hotel.name,
                h: "200px",
                objectFit: "cover",
                borderTopRadius: "lg",
                transition: "transform 0.4s ease-in-out",
              }}
              wrapperProps={{
                onClick: () => handleClick(hotel.hotelId),
              }}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Hotels;
