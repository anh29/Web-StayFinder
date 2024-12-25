import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { fetchEnhancedHotels } from "api/fetchData";
import HotelCard from "components/layouts/HotelCard";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EnhancedHotel } from "types/enhancedData";
import { getTopHotels } from "utils/getTopHotels";

const MostPickedSection = () => {
  const [hotels, setHotels] = useState<EnhancedHotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  useEffect(() => {
    const loadHotels = async () => {
      try {
        const fetchedHotels = await fetchEnhancedHotels();
        setHotels(fetchedHotels);
      } catch (error) {
        setError("Failed to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const top5Hotels = getTopHotels({ hotels, top: 5 });

  if (loading) {
    return (
      <Box id="most-picked" pt={20} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box id="most-picked" pt={20} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }
  const handleClick = (hotelId: string) => {
    history.push(`/hotel?id=${hotelId}`);
  };
  return (
    <Box id="most-picked" pt={10}>
      <Heading size="lg" mb={6} textAlign="center">
        Most Picked
      </Heading>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {/* Best hotel displayed in full width */}
        <Box
          width={{ base: "100%", md: "33%" }}
          my={1}
          position="relative"
          onClick={() => handleClick(top5Hotels[0].hotelId)}
        >
          <HotelCard
            imageUrl={top5Hotels[0].images[0]}
            name={top5Hotels[0].name}
            location={top5Hotels[0].location.address}
            pricePerNight={`${top5Hotels[0].priceRange.min}-${top5Hotels[0].priceRange.max}`}
            starRating={top5Hotels[0].rating}
            isFullWidth={true}
            imageHeight={{ base: "200px", md: "424px" }}
          />
        </Box>

        {/* Remaining hotels displayed in a flex box */}
        <Box
          width={{ base: "100%", md: "66%" }}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {top5Hotels.slice(1).map((hotel) => (
            <Box
              key={hotel.hotelId}
              p={0}
              m={1}
              width={{ base: "100%", sm: "48%" }}
              position="relative"
              onClick={() => handleClick(hotel.hotelId)}
            >
              <HotelCard
                imageUrl={hotel.images[0]}
                name={hotel.name}
                location={hotel.location.address}
                pricePerNight={`${hotel.priceRange.min}-${hotel.priceRange.max}`} // Corrected price range
                starRating={hotel.rating}
                isFullWidth={true} // Set to false for smaller cards
              />
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default MostPickedSection;
