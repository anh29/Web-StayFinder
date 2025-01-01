import { Box, Button, Select, Stack, Text, useBreakpointValue, useToast, HStack, Input, Tooltip, Spinner } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PERSON_OPTIONS } from "data/constants";
import SearchLocation from "components/elements/SearchLocation";
import CustomDatePicker from "components/layouts/CustomDatePicker";

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

  const formatDate = (date: Date | null): string => (date ? date.toISOString().slice(0, 10) : "");

  const increaseDateByOneDay = (date: Date | null): Date | null => {
    if (!date) return null;
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // Add 1 day
    return newDate;
  };

  const handleSearch = () => {
    const { location, checkInDate, checkOutDate, persons } = searchParams;

    // Validation: Ensure all fields are filled
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

    // Validation: Ensure check-out date is after check-in date
    if (checkInDate > checkOutDate) {
      toast({
        title: "Invalid Date Range",
        description: "Check-out date must be after check-in date.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Increase the dates by 1 day before passing them
    const adjustedCheckInDate = increaseDateByOneDay(checkInDate);
    const adjustedCheckOutDate = increaseDateByOneDay(checkOutDate);

    const query = `?location=${encodeURIComponent(location)}&checkIn=${formatDate(adjustedCheckInDate)}&checkOut=${formatDate(adjustedCheckOutDate)}&persons=${persons}`;
    
    setLoading(true); // Start loading
    history.push(`/search${query}`);
    onClose(); // Close the modal after search

    // Show success toast
    toast({
      title: "Search Initiated",
      description: "Your search has been started.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setLoading(false); // Stop loading
  };

  const handleClear = () => {
    setSearchParams({
      location: '',
      checkInDate: null,
      checkOutDate: null,
      persons: 1,
    });
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
          <SearchLocation
            onLocationSelect={(description) => setSearchParams((prev) => ({ ...prev, location: description }))}
          />

          <Text fontSize="xl" fontWeight="semibold">Dates</Text>
          <CustomDatePicker
            value={{
              from: searchParams.checkInDate,
              to: searchParams.checkOutDate,
            }}
            onChange={({ from, to }) => setSearchParams((prev) => ({
              ...prev,
              checkInDate: from,
              checkOutDate: to,
            }))}
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
              isLoading={loading} // Display loading state on the button
              loadingText="Searching..."
              isDisabled={loading} // Disable the button when loading
            >
              <SearchIcon mr={2} />
              Search
            </Button>
            <Button
              size={size}
              variant="outline"
              onClick={handleClear}
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
