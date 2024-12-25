import { Box, Text, SimpleGrid, Tag, Heading, Flex, Button, useBreakpointValue, Spinner, Icon, useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Booking, Room } from "types/data";
import RoomImageCarousel from "./RoomImageCarousel";
import { FaWifi, FaWind, FaTv, FaSwimmer } from "react-icons/fa"; 
import BookingModal from "components/booking/BookingModal"; 
import { useHistory } from "react-router-dom";

interface RoomDetailProps {
  room: Room;
}

const RoomDetail: FC<RoomDetailProps> = ({ room }) => {
  const { price, capacity, amenities, type, hotelId } = room;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const history = useHistory();
  const toast = useToast();

  const nextImage = () => {
    if (room?.images?.length) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % room.images.length);
    }
  };

  const prevImage = () => {
    if (room?.images?.length) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
      );
    }
  };

  const images = room?.images ?? [];

  
  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false); 
      setIsModalOpen(true); 
    }, 2000);
  };

  
  const amenitiesIcons: { [key: string]: React.ReactNode } = {
    "WiFi": <FaWifi />,
    "Air Conditioning": <FaWind />,
    "Minibar": <FaTv />,
    "Balcony": <FaSwimmer />,
  };


  const confirmBooking = async (booking: Booking) => {
    try {
      toast({
        title: "Booking Successful!",
        description: `You have booked the ${room.type} for €${room.price} per night.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={6}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      boxShadow="xl"
      bg="white"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "2xl",
        transform: "scale(1.02)",
      }}
      mb={8}
    >
      <RoomImageCarousel
        images={images}
        currentIndex={currentIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* Room Type */}
      <Box
        bg="gray.50"
        borderRadius="md"
        p={4}
        mb={4}
        display="inline-block"
        fontWeight="bold"
        boxShadow="sm"
      >
        <Text fontSize={isMobile ? "xl" : "2xl"} color="gray.700">
          {type} {/* Display Room Type */}
        </Text>
      </Box>

      {/* Price Section */}
      <Box
        bg="teal.50"
        borderRadius="md"
        p={4}
        mb={4}
        display="inline-block"
        fontWeight="bold"
        boxShadow="md"
      >
        <Text fontSize={isMobile ? "xl" : "3xl"} color="teal.500">
          {price} 000 VND
          <Text as="span" fontSize={isMobile ? "md" : "lg"} color="gray.600"> / night</Text>
        </Text>
      </Box>

      {/* Capacity */}
      <Text fontSize={isMobile ? "md" : "lg"} color="gray.700" mb={4}>
        <strong>{capacity} {capacity > 1 ? "guests - 2 beds" : "guest - 1 bed"}</strong>
      </Text>

      {/* Amenities */}
      <Heading size="md" mb={3} color="gray.800">
        Amenities
      </Heading>
      <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={4} mb={6}>
        {amenities.map((amenity) => (
          <Tag
            key={amenity}
            colorScheme="teal"
            size="md"
            borderRadius="full"
            fontWeight="semibold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
            py={2}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              bg: "teal.100",
            }}
          >
            {/* Display icon if available */}
            <Box mr={2}>{amenitiesIcons[amenity] || null}</Box>
            {amenity}
          </Tag>
        ))}
      </SimpleGrid>

      {/* Call-to-action */}
      <Flex justifyContent="center" mt={6}>
        <Button
          colorScheme="teal"
          size="lg"
          w="40%"
          boxShadow="md"
          isLoading={isBooking}
          loadingText="Booking..."
          onClick={handleBooking}
          _hover={{
            boxShadow: "lg",
            transform: "scale(1.05)",
            bg: "teal.600",
          }}
          _active={{
            bg: "teal.700",
          }}
        >
          {isBooking ? <Spinner size="sm" /> : "Book Now"}
        </Button>
      </Flex>
      
      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
        onConfirm={confirmBooking}
        onRedirect={() => history.push("/history")}
      />
    </Box>
  );
};

export default RoomDetail;
