import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Heading
} from '@chakra-ui/react';
import { fetchHotelsByFilters } from 'api/api';
import HotelGrid from 'pages/hotels/components/HotelGrid';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hotel } from 'types/data';

const SearchPage = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filters = {
      date: queryParams.get('date') || '',
      persons: queryParams.get('persons') || '',
      location: queryParams.get('location') || '',
    };

    const fetchHotelsData = async () => {
      try {
        setLoading(true);
        const data = await fetchHotelsByFilters(filters);
        setHotels(data);
      } catch (err) {
        setError("Error fetching hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsData();
  }, [location.search]);

  if (loading) {
    return (
      <Box textAlign="center" p={6}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt={4} textAlign="center">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Results Section */}
      <Box p={6}>
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">
          Search Results
        </Heading>
        {hotels.length > 0 ? (
          <HotelGrid hotels={hotels} />
        ) : (
          <Text mt={2} textAlign="center" fontSize="lg" color="black">
            No hotels found for your search criteria.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
