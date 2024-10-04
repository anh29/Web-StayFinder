import { useState } from 'react';
import { Box, Button, Flex, Input, Select } from '@chakra-ui/react';
import { FiCalendar, FiMapPin, FiUser } from 'react-icons/fi';
import { PERSON_OPTIONS } from 'data/constants';
import { useHistory } from 'react-router-dom';

// Define the props for InputField
interface InputFieldProps {
  icon: JSX.Element;
  placeholder: string;
  name: string; // Name attribute for identifying fields
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ icon, placeholder, value, name, onChange, type = 'text' }) => (
  <Flex alignItems="center" flex={1}>
    {icon}
    <Input
      name={name}
      aria-label={placeholder}
      placeholder={placeholder}
      ml={2}
      type={type}
      value={value}
      onChange={onChange}
      borderRadius="md"
      borderColor="gray.300"
      _hover={{ borderColor: 'teal.400' }}
      _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
      minWidth={{ base: '240px' }}
    />
  </Flex>
);

// Define the props for SearchButton
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
    _hover={{ bg: 'teal.600' }}
  >
    Search
  </Button>
);

// Define the main SearchSection component
const SearchSection = () => {
  const [formData, setFormData] = useState({
    date: '',
    persons: '',
    location: '',
  });
  const history = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const { date, persons, location } = formData;
    if (!date || !persons || !location) {
      alert('Please fill in all fields.');
      return;
    }

    const query = `?date=${encodeURIComponent(date)}&persons=${encodeURIComponent(persons)}&location=${encodeURIComponent(location)}`;
    history.push(`/search${query}`);
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
        direction={{ base: 'column', md: 'row' }} // Responsive direction
        alignItems="center"
        justifyContent="space-between"
        gap={4}
      >
        <InputField
          icon={<FiCalendar />}
          placeholder="Check Available"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          type="date"
        />

        <Flex alignItems="center" flex={1}>
          <FiUser />
          <Select
            name="persons"
            aria-label="Select number of persons"
            placeholder="Person"
            ml={2}
            value={formData.persons}
            onChange={handleInputChange}
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: 'teal.400' }}
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
            minWidth={{ base: '240px' }}
          >
            {PERSON_OPTIONS.map((num) => (
              <option key={num} value={num}>
                {`Person: ${num}`}
              </option>
            ))}
          </Select>
        </Flex>

        <InputField
          icon={<FiMapPin />}
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
