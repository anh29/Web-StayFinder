import { useState } from "react";
import { Box, Button, Flex, Select } from "@chakra-ui/react";
import { FiCalendar, FiMapPin, FiUser } from "react-icons/fi";
import { PERSON_OPTIONS } from "data/constants";
import { useHistory } from "react-router-dom";
import { InputField } from "components/elements/InputField";

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => (
  <Button
    colorScheme="teal"
    variant="solid"
    onClick={onClick}
    borderRadius="md"
    px={6}
    _hover={{ bg: "teal.600" }}
  >
    Search
  </Button>
);

const SearchSection = () => {
  const [formData, setFormData] = useState<{
    date: string;
    persons: string;
    location: string;
  }>({
    date: "",
    persons: "",
    location: "",
  });
  const history = useHistory();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const { date, persons, location } = formData;
    const queryParams = new URLSearchParams();

    if (date) {
      queryParams.append("startDate", encodeURIComponent(date));
    }
    if (persons) {
      queryParams.append("persons", encodeURIComponent(persons));
    }
    if (location) {
      queryParams.append("location", encodeURIComponent(location));
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    history.push(`/search${query}`);

    setFormData({ date: "", persons: "", location: "" });
  };

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      p={6}
      mb={6}
      border="1px"
      borderColor="gray.200"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={4}
      >
        <InputField
          icon={<FiCalendar aria-label="Check available date" />}
          placeholder="Check Available"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          type="date"
        />

        <Flex alignItems="center" flex={1}>
          <FiUser aria-label="Select number of persons" />
          <Select
            name="persons"
            aria-label="Select number of persons"
            placeholder="Person"
            ml={2}
            value={formData.persons}
            onChange={handleInputChange}
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: "teal.400" }}
            _focus={{
              borderColor: "teal.500",
              boxShadow: "0 0 0 1px teal.500",
            }}
            minWidth={{ base: "240px" }}
          >
            {PERSON_OPTIONS.map((num) => (
              <option key={num} value={num}>
                {`Person: ${num}`}
              </option>
            ))}
          </Select>
        </Flex>

        <InputField
          icon={<FiMapPin aria-label="Select location" />}
          placeholder="Select Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />

        <SearchButton onClick={handleSearch} />
      </Flex>
    </Box>
  );
};

export default SearchSection;
