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
import Carousel from "components/widgets/Carousel/Carousel";
import HotelCard from "components/elements/Card/HotelCard";
import { getHotels } from "api/hotelService";
import { Hotel } from "types/hotel";

export const renderHotelCards = ({
  hotel,
  sizeCard,
  sizeImage,
  sizeWrapper,
  handleClick,
  ...props
}: {
  hotel: Hotel;
  sizeCard: object;
  sizeImage: object;
  sizeWrapper: object;
  handleClick: (hotelId: string) => void;
  [key: string]: any;
}) => {
  return (
    <HotelCard
      key={hotel._id}
      hotel={hotel}
      handleClick={() => handleClick(hotel._id)}
      cardProps={{
        borderWidth: 2,
        borderColor: "blue.500",
        ...sizeCard,
      }}
      imageProps={{
        ...sizeImage,
        overlayProps: { bg: "rgba(255, 255, 255, 0.8)", color: "black" },
      }}
      wrapperProps={{
        ...sizeWrapper,
        _hover: { transform: "scale(1.05)", boxShadow: "sm" },
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      {...props}
    />
  );
};

const MostPickedSection: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const hotels = await getHotels();
        if (typeof hotels === 'string') {
          setError(hotels);
        } else {
          setHotels(hotels);
        }
      } catch (err) {
        setError("Failed to fetch hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const handleClick = (hotelId: string) => {
    history.push(`/hotel?id=${hotelId}`);
  };

  if (loading) {
    return (
      <Box id="most-picked" pt={20} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error || !hotels) {
    return (
      <Box id="most-picked" pt={20} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  const desktopTopCardProps = {
    sizeCard: { h: { base: "200px", md: "90%" } },
    sizeImage: { h: { base: "200px", md: "76%" } },
    sizeWrapper: { width: { base: "100%", md: "33%" } },
  };

  const desktopOtherCardsProps = {
    sizeCard: { h: { base: "200px", md: "260px" } },
    sizeImage: { h: { base: "200px", md: "160px" } },
    sizeWrapper: { width: { base: "100%", sm: "32%" } },
  };

  const topHotel = hotels[0];
  const otherHotels = hotels.slice(1).slice(0, 5);

  return (
    <Box id="most-picked" pt={10}>
      <Heading size="lg" mb={6} textAlign="center">
        Most Picked
      </Heading>
      {isMobile ? (
        <Carousel
          items={otherHotels.map((hotel) =>
            renderHotelCards({ hotel, handleClick, ...desktopOtherCardsProps })
          )}
          itemsPerPage={1}
          cardWidth={300}
        />
      ) : (
          <Flex width={"100%"} flexWrap="wrap" gap={3}>
            {hotels.map((hotel) =>
              renderHotelCards({ hotel, handleClick, ...desktopOtherCardsProps })
            )}
          </Flex>
      )}
    </Box>
  );
};

export default MostPickedSection;
