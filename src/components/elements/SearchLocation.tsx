import React, { useState, useEffect, useRef } from "react";
import { Input, Box, List, ListItem, Spinner } from "@chakra-ui/react";

interface SearchLocationProps {
  onLocationSelect: (description: string) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({
  onLocationSelect,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "VN" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          onLocationSelect(place.formatted_address);
          setInputValue(place.formatted_address); // Set the input value to the formatted address
        }
      });
    }
  }, [onLocationSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query); // Update the input value state

    if (query) {
      setLoading(true);

      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: query, componentRestrictions: { country: 'VN' } }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
        setLoading(false);
      });
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  };

  const handleSuggestionClick = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    onLocationSelect(prediction.description);
    setInputValue(prediction.description); // Update the input value when a suggestion is clicked
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <Box>
      <Input
        ref={inputRef}
        value={inputValue} // Bind the input value to the state
        placeholder="Search for a location"
        size="md"
        variant="outline"
        bg="white"
        borderColor="teal.300"
        borderRadius="md"
        onChange={handleInputChange}
      />

      {/* Show loading spinner while fetching suggestions */}
      {loading && (
        <Box mt={2} textAlign="center">
          <Spinner size="sm" color="teal.500" />
        </Box>
      )}

      {/* Display suggestions if there are any */}
      {suggestions.length > 0 && (
        <List
          spacing={1}
          mt={2}
          maxHeight="200px"
          overflowY="auto"
          border="1px solid #ddd"
          borderRadius="md"
        >
          {suggestions.map((prediction) => (
            <ListItem
              key={prediction.place_id}
              p={2}
              _hover={{ bg: "teal.100", cursor: "pointer" }}
              onClick={() => handleSuggestionClick(prediction)}
            >
              {prediction.description}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchLocation;
