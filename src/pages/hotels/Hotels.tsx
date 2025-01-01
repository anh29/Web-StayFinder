import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Grid, Button, keyframes } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import HotelCard from "components/elements/Card/HotelCard";
import { getHotels } from "api/hotelService";
import { Hotel } from "types/hotel";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export interface HotelsProps {}

const Hotels: React.FC<HotelsProps> = () => {
  const history = useHistory();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const fetchedHotels = await getHotels();
        if (typeof fetchedHotels === 'string') {
          setError(fetchedHotels);
        } else {
          setHotels(fetchedHotels);
        }
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

  if (error) {
    return (
      <Box id="most-picked" pt={20} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }
  
  return (
    <Box
      w="100%"
      maxW="1300px"
      p={{ base: 2, md: 4 }}
      bgGradient="linear(to-r, pink.400, blue.500)"
    >
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color="white"
        textAlign="center"
        mb={{ base: 4, md: 8 }}
      >
        Welcome to Our Hotels!
      </Text>

      {loading ? (
        <Text fontSize={{ base: "lg", md: "xl" }} color="white" textAlign="center">
          Loading hotels...
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={{ base: 4, md: 6 }}>
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              handleClick={() => handleClick(hotel._id)}
              cardProps={{
                borderRadius: "lg",
                boxShadow: "lg",
                bg: "white",
                h: "340px",
                position: "relative",
                transition: `${bounce} 1s infinite`,
                _hover: {
                  boxShadow: "2xl",
                  transform: "scale(1.05)",
                  filter: "brightness(1.1)",
                },
                cursor: "pointer",
              }}
              imageProps={{
                alt: hotel.name,
                h: "200px",
                objectFit: "cover",
                borderTopRadius: "lg",
                transition: "transform 0.4s ease-in-out",
              }}
              wrapperProps={{
                onClick: () => handleClick(hotel._id),
              }}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Hotels;
