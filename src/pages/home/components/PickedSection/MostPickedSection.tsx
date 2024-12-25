import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { fetchEnhancedHotels } from "api/fetchData";
import Carousel from "components/widgets/Carousel/Carousel";
import { EnhancedHotel } from "types/enhancedData";
import { getTopHotels } from "utils/getTopHotels";
import HotelCard from "components/elements/Card/HotelCard";

const MostPickedSection: React.FC = () => {
  const [hotels, setHotels] = useState<EnhancedHotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const fetchedHotels = await fetchEnhancedHotels();
        setHotels(fetchedHotels);
      } catch (err) {
        setError("Failed to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const top5Hotels = getTopHotels({ hotels, top: 5 });

  const handleClick = (hotelId: string) => {
    history.push(`/hotel?id=${hotelId}`);
  };

  const renderHotelCards = ({
    hotel,
    sizeCard,
    sizeImage,
    sizeWrapper,
  }: {
    hotel: EnhancedHotel;
    sizeCard: object;
    sizeImage: object;
    sizeWrapper: object;
  }) => {
    return (
      <HotelCard
        key={hotel.hotelId}
        hotel={hotel}
        handleClick={() => handleClick(hotel.hotelId)}
        cardProps={{
          borderWidth: 2,
          borderColor: "blue.500",
          ...sizeCard,
        }}
        imageProps={{
          src: hotel.images[0],
          ...sizeImage,
          overlayProps: { bg: "rgba(255, 255, 255, 0.8)", color: "black" },
        }}
        wrapperProps={{
          ...sizeWrapper,
          _hover: { transform: "scale(1.05)", boxShadow: "sm" },
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    );
  };

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

  const mobileProps = {
    sizeCard: { h: "200px" },
    sizeImage: { h: "200px" },
    sizeWrapper: { width: "100%" },
  };

  const desktopTopCardProps = {
    sizeCard: { h: { base: "200px", md: "100%" } },
    sizeImage: { h: { base: "200px", md: "80%" } },
    sizeWrapper: { width: { base: "100%", md: "33%" } },
  };

  const desktopOtherCardsProps = {
    sizeCard: { h: { base: "200px", md: "260px" } },
    sizeImage: { h: { base: "200px", md: "160px" } },
    sizeWrapper: { width: { base: "100%", sm: "48%" } },
  };

  return (
    <Box id="most-picked" pt={10}>
      <Heading size="lg" mb={6} textAlign="center">
        Most Picked
      </Heading>
      {isMobile ? (
        <Carousel
          items={top5Hotels.map((hotel) =>
            renderHotelCards({ hotel, ...mobileProps })
          )}
          itemsPerPage={1}
          cardWidth={300}
        />
      ) : (
        <Flex flexWrap="wrap" justifyContent="space-between" gap={3}>
          {/* Top hotel */}
          {renderHotelCards({
            hotel: top5Hotels[0],
            ...desktopTopCardProps,
          })}

          {/* Other hotels */}
          <Flex width={{ base: "100%", md: "66%" }} flexWrap="wrap" gap={3}>
            {top5Hotels.slice(1).map((hotel) =>
              renderHotelCards({ hotel, ...desktopOtherCardsProps })
            )}
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default MostPickedSection;
