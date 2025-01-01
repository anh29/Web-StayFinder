import { Box, Text, SimpleGrid, Tag, Heading, Image, Flex, Button, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { API_URL } from "constants/app";
import { FC } from "react";
import { FiMapPin, FiImage, FiWifi, FiCoffee, FiMonitor } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Hotel } from "types/hotel";

interface HotelInfoProps {
  hotel: Hotel | string;
}

const HotelInfo: FC<HotelInfoProps> = ({ hotel }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const history = useHistory();
  if (typeof hotel === "string") {
    return <Text color="gray.500">{hotel}</Text>;
  }
console.log('hotel', hotel);
  const { name, location, amenities, media, _id } = hotel;

  return (
    <Box
      mt={10}
      p={8}
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
    >
      {/* Hotel Name */}
      <Heading
        size={isMobile ? "md" : "lg"}
        mb={4}
        color="blue.700"
        fontWeight="bold"
        textAlign="center"
        _hover={{ textDecoration: "underline", color: "blue.500", cursor: "pointer" }}
        onClick={() => history.push(`/hotel?id=${_id}`)}
      >
        {name}
      </Heading>

      {/* Address Section */}
      <Flex direction="column" align="center" mb={6}>
        <Text fontSize="lg" display="flex" gap="10px" alignItems="center" color="gray.600" textAlign="center">
          <FiMapPin color="blue.400" />
          <strong>Address:</strong> {location.city}, {location.country}
        </Text>
      </Flex>

      {/* Facilities Section */}
      <Heading size="md" mb={3} color="gray.800" textAlign="center">
        Hotel Facilities
      </Heading>
      <SimpleGrid display={{ base: "block", md: "grid"}} columns={{ base: 2, sm: 3 }} spacing={4} mb={6}>
        {amenities.map((amenity, index) => (
          <Tooltip label={`Enjoy our ${amenity}`} hasArrow placement="top" key={index}>
            <Tag
              colorScheme="blue"
              size="lg"
              py="10px"
              boxShadow="md"
              borderRadius="full"
              fontWeight="semibold"
              display="flex"
              justifyContent="center"
              alignItems="center"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                bg: "blue.100",
              }}
            >
              <strong>{amenity}</strong>
            </Tag>
          </Tooltip>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HotelInfo;
