import { fetchRooms } from "api/api";
import React, { useEffect, useState } from "react";
import { Room } from "types/data";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const RoomsPage = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState<Room[]>([]);

  const amenities = [
    "WiFi",
    "Air Conditioning",
    "Swimming Pool",
    "Free Parking",
    "Restaurant",
    "Gym",
    "Minibar",
    "Balcony",
    "Beach Access",
    "Spa",
    "Pet Friendly",
    "Room Service",
    "Business Center",
    "Laundry Service",
    "Bar",
  ];
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [filters, setFilters] = useState<{
    type: string;
    priceRange: number[];
    amenities: string[];
  }>({
    type: "",
    priceRange: [0, 500],
    amenities: [],
  });

  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    getRooms();
  }, []);

  const applyFilters = () => {
    let newFilteredRooms = rooms;

    if (filters.type) {
      newFilteredRooms = newFilteredRooms.filter(
        (room) => room.type === filters.type
      );
    }

    newFilteredRooms = newFilteredRooms.filter(
      (room) =>
        room.price >= filters.priceRange[0] &&
        room.price <= filters.priceRange[1]
    );

    if (filters.amenities.length > 0) {
      newFilteredRooms = newFilteredRooms.filter((room) =>
        filters.amenities.every((amenity) => room.amenities.includes(amenity))
      );
    }

    setFilteredRooms(newFilteredRooms);
  };

  const handleAmenityChange = (amenity: string) => {
    setFilters((prevFilters) => {
      const newAmenities = prevFilters.amenities.includes(amenity)
        ? prevFilters.amenities.filter((a) => a !== amenity)
        : [...prevFilters.amenities, amenity];

      return { ...prevFilters, amenities: newAmenities };
    });
  };
  const handleClick = (id: string) => {
    history.push(`/room?id=${id}`);
  };
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="start" mb={8}>
        <Heading>Find Your Perfect Room</Heading>
        <Text color="gray.500">
          Choose from a variety of room types and amenities to suit your needs.
        </Text>
      </VStack>

      <HStack alignItems="start" spacing={8}>
        {/* Filters Section */}
        <Box width="25%" bg="white" p={6} borderRadius="md" shadow="md">
          <Heading size="md" mb={6}>
            Filters
          </Heading>

          <FormControl mb={4}>
            <FormLabel>Room Type</FormLabel>
            <Select
              placeholder="Select type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              bg="gray.50"
            >
              <option value="Deluxe Suite">Deluxe Suite</option>
              <option value="Standard Room">Standard Room</option>
              {/* Add more options as necessary */}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Price Range (€)</FormLabel>
            <HStack spacing={4}>
              <Text>€{filters.priceRange[0]}</Text>
              <Input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [0, parseInt(e.target.value)],
                  })
                }
              />
              <Text>€{filters.priceRange[1]}</Text>
            </HStack>
          </FormControl>

          <FormControl mb={6} display={"flex"} flexDirection={"column"}>
            <FormLabel>Amenities</FormLabel>
            {amenities.map((amenity) => (
              <Checkbox
                key={amenity}
                isChecked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                colorScheme="blue"
                size="lg"
                iconColor="white"
              >
                {amenity}
              </Checkbox>
            ))}
          </FormControl>

          <Button colorScheme="blue" width="full" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Box>

        {/* Rooms List Section */}
        <Box width="75%">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <Box
                  key={room.roomId}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  shadow="md"
                  transition="all 0.3s"
                  _hover={{ shadow: "xl" }}
                >
                  <img
                    src={room.images[0]}
                    alt={room.type}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Box p={6}>
                    <Heading size="md" mb={2}>
                      {room.type}
                    </Heading>
                    <Text color="gray.600" mb={2}>
                      Price: €{room.price} / night
                    </Text>
                    <Text color="gray.600" mb={4}>
                      Capacity: {room.capacity} guests
                    </Text>
                    <Text color="gray.600">
                      Amenities: {room.amenities.join(", ")}
                    </Text>
                    <Button
                      onClick={() => handleClick(room.roomId)}
                      mt={4}
                      colorScheme="teal"
                      size="sm"
                    >
                      Visit Now
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Text>No rooms available based on your filters.</Text>
            )}
          </SimpleGrid>
        </Box>
      </HStack>
    </Container>
  );
};

export default RoomsPage;
