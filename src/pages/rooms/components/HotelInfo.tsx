import { Box, Text, SimpleGrid, Tag, Heading, Image, Flex, Button, Tooltip, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { FiMapPin, FiImage, FiWifi, FiCoffee, FiMonitor } from "react-icons/fi";
import { Hotel } from "types/data";

interface HotelInfoProps {
  hotel: Hotel;
}

const HotelInfo: FC<HotelInfoProps> = ({ hotel }) => {
  const { name, location, facilities, images } = hotel;
  const isMobile = useBreakpointValue({ base: true, sm: false });

  
  const facilityIcons: { [key: string]: any } = {
    Restaurant: FiCoffee,
    Gym: FiMonitor,
    "Swimming Pool": FiWifi,
    "Free Parking": FiMapPin,
  };

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
        _hover={{ textDecoration: "underline", color: "blue.500" }}
      >
        {name}
      </Heading>

      {/* Address Section */}
      <Flex direction="column" align="center" mb={6}>
        <Text fontSize="lg" display="flex" gap="10px" alignItems="center" color="gray.600" textAlign="center">
          <FiMapPin color="blue.400" />
          <strong>Address:</strong> {location.address}, {location.city}, {location.country}
        </Text>
      </Flex>

      {/* Facilities Section */}
      <Heading size="md" mb={3} color="gray.800" textAlign="center">
        Hotel Facilities
      </Heading>
      <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={4} mb={6}>
        {facilities.map((facility, index) => (
          <Tooltip label={`Enjoy our ${facility}`} hasArrow placement="top" key={index}>
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
              {/* Use the icon type from facilityIcons */}
              <Icon as={facilityIcons[facility] || FiWifi} mr={2} />
              <strong>{facility}</strong>
            </Tag>
          </Tooltip>
        ))}
      </SimpleGrid>

      {/* Hotel Images Section */}
      <Box mt={8}>
        <Heading size="md" mb={4} fontWeight="medium" color="gray.800" textAlign="center">
          Hotel Images
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {images.map((image, index) => (
            <Box
              key={index}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              transition="transform 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
              }}
            >
              <Image
                src={image}
                alt={`Hotel Image ${index + 1}`}
                borderRadius="lg"
                objectFit="cover"
                boxSize="100%"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.1)" }}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Call-to-action */}
      <Flex justifyContent="center" mt={8}>
        <Button
          colorScheme="blue"
          variant="solid"
          size="lg"
          leftIcon={<FiImage />}
          boxShadow="sm"
          _hover={{
            boxShadow: "md",
            transform: "scale(1.05)",
            bg: "blue.600",
          }}
          _active={{
            bg: "blue.700",
          }}
        >
          View More Details
        </Button>
      </Flex>
    </Box>
  );
};

export default HotelInfo;
