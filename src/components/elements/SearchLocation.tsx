import React, { useEffect, useRef, useState } from 'react';
import { Box, Input, Button, List, ListItem, Spinner } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const mapboxAccessToken = 'pk.eyJ1IjoiYW5uYTEwMSIsImEiOiJjbHk3eGRmbGkwYjQzMmlxNHg5bG95cjJhIn0.hyPx7VhosqgQInayT8xUIQ';

interface SearchLocationProps {
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onLocationSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const handleResultRef = useRef<(event: any) => void>(() => {});

  useEffect(() => {
    (mapboxgl as any).accessToken = mapboxAccessToken;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxAccessToken,
      mapboxgl: (mapboxgl as any),
      marker: false,
      placeholder: 'Search for a location in Vietnam',
      limit: 5,
    });

    handleResultRef.current = (event: any) => {
      const { lng, lat } = event.result.geometry.coordinates;
      const name = event.result.place_name;
      onLocationSelect({ lat, lng, name });
     
      setSuggestions([]);
    };

    geocoder.on('result', handleResultRef.current);

    geocoder.on('results', (event: any) => {
      setSuggestions(event.features);
      setLoading(false);
    });

    geocoderRef.current = geocoder;

    const container = document.createElement('div');
    container.className = 'geocoder-container';
    document.body.appendChild(container);
    geocoder.addTo(container);

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.off('result', handleResultRef.current);
        geocoderRef.current.off('results', handleResultRef.current);
        geocoderRef.current.onRemove();
      }
    };
  }, [onLocationSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setLoading(true);
    if (geocoderRef.current) {
      geocoderRef.current.query(value);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const { lng, lat } = suggestion.geometry.coordinates;
    const name = suggestion.place_name;
    onLocationSelect({ lat, lng, name });
    setInputValue(name);
    setSuggestions([]);
  };

  const handleClear = () => {
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <Box position="relative">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type a location in Vietnam"
        mb={2}
      />
      <Button onClick={handleClear} colorScheme="gray" size="sm">Clear</Button>
      {loading && <Spinner size="sm" />}
      {suggestions.length > 0 && (
        <List spacing={1} borderWidth="1px" borderRadius="md" maxHeight="200px" overflowY="auto" position="absolute" bg="white" zIndex={1}>
          {suggestions.map((suggestion) => (
            <ListItem 
              key={suggestion.id} 
              onClick={() => handleSuggestionClick(suggestion)} 
              p={2} 
              cursor="pointer" 
              _hover={{ bg: 'gray.200' }}
            >
              {suggestion.place_name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchLocation;
