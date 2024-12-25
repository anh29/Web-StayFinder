import { Box, Button, Select, Stack, Text, useBreakpointValue, useToast, HStack, Spinner, Tooltip } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PERSON_OPTIONS } from "data/constants";
import SearchLocation from "components/elements/SearchLocation";
import DateSelection from "components/layouts/DateSection";

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkInDate: null as Date | null,
    checkOutDate: null as Date | null,
    persons: 1,
  });
  const toast = useToast();
  const size = useBreakpointValue({ base: "md", md: "lg" });
  const history = useHistory();

  const formatDate = (date: Date | null): string => {
    return date ? date.toISOString().slice(0, 10) : "";
  };

  const handleSearch = () => {
    const { location, checkInDate, checkOutDate, persons } = searchParams;

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

    const query = `?location=${encodeURIComponent(location)}&checkIn=${formatDate(checkInDate)}&checkOut=${formatDate(checkOutDate)}&persons=${persons}`;
    setLoading(true);
    history.push(`/search${query}`);
    onClose();
    toast({
      title: "Search Initiated",
      description: "Your search has been started.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setLoading(false); // Set loading to false after the search is initiated
  };

  const handleLocationSelect = (description: string) => {
    setSearchParams((prev) => ({ ...prev, location: description }));
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
      <Text fontSize="3xl" fontWeight="bold" color="teal.600" textAlign="center" mb={6}>
        Find Your Perfect Stay
      </Text>
      {loading ? (
        <HStack spacing={2} justify="center">
          <Spinner size="lg" color="teal.500" />
          <Text>Loading locations...</Text>
        </HStack>
      ) : (
        <Stack spacing={4}>
          <Text fontSize="xl" fontWeight="semibold">Location</Text>
          <SearchLocation onLocationSelect={handleLocationSelect} />
          <Text fontSize="xl" fontWeight="semibold">Dates</Text>
          <DateSelection
            checkInDate={searchParams.checkInDate}
            setCheckInDate={(date) => setSearchParams((prev) => ({ ...prev, checkInDate: date }))}
            checkOutDate={searchParams.checkOutDate}
            setCheckOutDate={(date) => setSearchParams((prev) => ({ ...prev, checkOutDate: date }))}
          />

          <Text fontSize="xl" fontWeight="semibold">Number of Persons</Text>
          <HStack spacing={4}>
            <Tooltip label="Select number of persons" aria-label="Select number of persons tooltip">
              <Select
                placeholder="Number of Persons"
                size={size}
                variant="outline"
                bg="white"
                borderColor="teal.300"
                borderRadius="md"
                value={searchParams.persons}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, persons: Number(e.target.value) }))}
              >
                {PERSON_OPTIONS.map((num) => (
                  <option key={num} value={num}>
                    {`Person: ${num}`}
                  </option>
                ))}
              </Select>
            </Tooltip>
          </HStack>

          <HStack spacing={4}>
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
            <Button
              size={size}
              variant="outline"
              onClick={() => {
                setSearchParams({
                  location: '',
                  checkInDate: null,
                  checkOutDate: null,
                  persons: 1,
                });
              }}
            >
              Clear
            </Button>
          </HStack>
        </Stack>
      )}
    </Box>
  );
};

export default SearchModal;
