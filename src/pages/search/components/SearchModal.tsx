import {
  Box,
  Input,
  Button,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getAllCities } from "api/api";
import { useHistory } from "react-router-dom";
import { PERSON_OPTIONS } from "data/constants";

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [persons, setPersons] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const toast = useToast();
  const size = useBreakpointValue({ base: "md", md: "lg" });
  const history = useHistory();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityList = await getAllCities();
        setCities(cityList);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = async () => {
    if (!location || !checkInDate || !checkOutDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const query = `?location=${encodeURIComponent(
        location
      )}&checkIn=${encodeURIComponent(
        checkInDate
      )}&checkOut=${encodeURIComponent(
        checkOutDate
      )}&persons=${encodeURIComponent(persons)}&minPrice=${encodeURIComponent(
        minPrice
      )}&maxPrice=${encodeURIComponent(maxPrice)}`;
      history.push(`/search${query}`);
      onClose();
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "There was an error fetching the search results.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mb={8}
      bg="white"
      border="2px solid teal"
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="teal.600"
        textAlign="center"
        mb={6}
      >
        Find Your Perfect Stay
      </Text>
      <Stack spacing={4}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Select
            placeholder="Location"
            size={size}
            variant="outline"
            bg="white"
            borderColor="teal.300"
            borderRadius="md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {loading ? (
              <option>Loading cities...</option>
            ) : (
              cities.map((city) => (
                <option key={city} value={city.toLowerCase()}>
                  {city}
                </option>
              ))
            )}
          </Select>
          <Select
            placeholder="Check-in"
            size={size}
            variant="outline"
            bg="white"
            borderColor="teal.300"
            borderRadius="md"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
          </Select>
          <Select
            placeholder="Check-out"
            size={size}
            variant="outline"
            bg="white"
            borderColor="teal.300"
            borderRadius="md"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          >
            <option value="1day">1 Day</option>
            <option value="2days">2 Days</option>
          </Select>
        </Stack>
        <HStack spacing={4}>
          <Select
            placeholder="Number of Persons"
            size={size}
            variant="outline"
            bg="white"
            borderColor="teal.300"
            borderRadius="md"
            value={persons}
            onChange={(e) => setPersons(Number(e.target.value))}
          >
            {PERSON_OPTIONS.map((num) => (
              <option key={num} value={num}>
                {`Person: ${num}`}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Min Price"
            size={size}
            variant="outline"
            bg="white"
            borderColor="teal.300"
            borderRadius="md"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <Input
            placeholder="Max Price"
            size={size}
            variant="outline"
            bg="white"
            borderColor="teal.300"
            borderRadius="md"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </HStack>
        <Button
          colorScheme="teal"
          size={size}
          borderRadius="md"
          _hover={{
            bg: "blue.500",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          transition="all 0.3s"
          onClick={handleSearch}
        >
          <SearchIcon mr={2} />
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchModal;
