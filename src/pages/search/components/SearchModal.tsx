import { Box, Input, Button, Select, Stack, Text, useBreakpointValue, useToast } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { fetchHotelsByFilters, getAllCities } from 'api/api';
import { useHistory } from 'react-router-dom';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const toast = useToast();
  const size = useBreakpointValue({ base: 'md', md: 'lg' });
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
    if (!location || !checkInDate) {
      toast({
        title: "Missing Information",
        description: "Please select a location and check-in date.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const query = `?date=${encodeURIComponent(checkInDate)}&persons=${encodeURIComponent('2')}&location=${encodeURIComponent(location)}`;
      history.push(`/search${query}`);
      onClose(); // Close the modal after a successful search
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
      _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
    >
      <Text fontSize="3xl" fontWeight="bold" color="teal.600" textAlign="center" mb={6}>
        Find Your Perfect Stay
      </Text>
      <Stack spacing={4}>
        <Input
          placeholder="Where are you going?"
          size={size}
          variant="outline"
          bg="white"
          borderColor="teal.300"
          borderRadius="md"
          _placeholder={{ color: 'gray.500' }}
          _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Select
            placeholder="Select Location"
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
                <option key={city} value={city.toLowerCase()}>{city}</option>
              ))
            )}
          </Select>
          <Select
            placeholder="Check-in Date"
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
        </Stack>
        <Button
          colorScheme="teal"
          size={size}
          borderRadius="md"
          _hover={{ bg: 'blue.500', transform: 'translateY(-2px)', boxShadow: 'lg' }}
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
