import { Box, Text, SimpleGrid, Tag, Heading, Flex, Button, useBreakpointValue, Spinner, Icon, useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import RoomImageCarousel from "./RoomImageCarousel";
import BookingModal from "components/booking/BookingModal"; 
import { useHistory } from "react-router-dom";
import { Room } from "types/room";
import { getCookie } from "utils/cookie";

interface RoomDetailComponentProps {
  room: Room;
}

const RoomDetailComponent: FC<RoomDetailComponentProps> = ({ room }) => {
  const { price, capacity, amenities, roomType, media } = room;
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const token = getCookie('token');
  const toast = useToast();

  const nextImage = () => {
    if (media?.length) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }
  };

  const prevImage = () => {
    if (media?.length) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? media.length - 1 : prevIndex - 1
      );
    }
  };
  
  const handleBooking = () => {
    if (!token) {
      toast({
        title: "Authentication required.",
        description: "Please log in to book a room.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      history.push('/login');
    }
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false); 
      setIsModalOpen(true); 
    }, 2000);
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
        images={media}
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
          {roomType} {/* Display Room Type */}
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
          {price} VND
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
      />
    </Box>
  );
};

export default RoomDetailComponent;
