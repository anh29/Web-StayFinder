import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  SimpleGrid,
  VStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { constructFiltersFromQuery } from "utils/search-filter";
import { searchRooms } from "api/roomService";
import { HotelFilter } from "types/hotel";
import { renderHotelCards } from "pages/home/components/PickedSection/MostPickedSection";
import { FilterOptions } from "types/config/filter";

const SearchPage = () => {
  const location = useLocation();
  const [result, setResult] = useState<HotelFilter[]>([]);
  const [filter, setFilter] = useState<FilterOptions>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filters = constructFiltersFromQuery(queryParams);
    setFilter(filters);
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await searchRooms(filters);
        if (typeof response === "string") {
          setError(response);
        } else {
          setResult(response);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [location.search]);

  if (loading) {
    return (
      <Box textAlign="center" p={6} minH="100vh" bg="gray.50">
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text fontSize="lg" color="teal.600">
            Loading your search results...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={6} minH="100vh" bg="gray.50">
        <Alert status="error" borderRadius="md" textAlign="center" maxW="lg" mx="auto">
          <AlertIcon />
          {error}
        </Alert>
        <Button mt={4} colorScheme="teal" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  const handleClick = (hotelId: string) => {
    history.push(`/hotel?id=${hotelId}`);
  };
  return (
    <Box minH="100vh" bg="gray.50">
      <Box p={6}>
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">
          Search Results
        </Heading>
        {result.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {result.map(({ hotel, price }) =>
              renderHotelCards({
                hotel,
                handleClick: () => handleClick(hotel._id),
                sizeCard: { h: "fit-content" },
                sizeImage: { h: "200px" },
                sizeWrapper: { width: "100%" },
                contentProps: {
                  footer: (
                    <>
                      <Flex alignItems="flex-start" flexDirection="column" fontSize="sm" color="gray.600">
                        <Box display="flex" alignItems="center">
                          <Text as="span" fontWeight="bold" color="teal.500" mr={2}>
                            🏨 Check-In:
                          </Text>
                          <Text as="span">{filter?.checkInDate || "N/A"}</Text>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Text as="span" fontWeight="bold" color="teal.500" mr={2}>
                            🏨 Check-Out:
                          </Text>
                          <Text as="span">{filter?.checkOutDate || "N/A"}</Text>
                        </Box>
                      </Flex>

                      <Text fontWeight="bold" color="teal.500">
                        Price: {price}VND per day
                      </Text>
                    </>
                  ),
                },
              })
            )}
          </SimpleGrid>
        ) : (
          <VStack spacing={4}>
            <Text mt={2} textAlign="center" fontSize="lg" color="black">
              No hotels found for your search criteria.
            </Text>
            <Button colorScheme="teal" onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
