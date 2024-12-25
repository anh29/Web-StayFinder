import React, { RefObject } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Tooltip,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";

interface MapControlsProps {
  originRef: RefObject<HTMLInputElement>;
  destinationRef: RefObject<HTMLInputElement>;
  onLoad: (autocomplete: google.maps.places.Autocomplete) => void;
  locationSelected: () => void;
  handleRouteClick: () => void;
  handleClearClick: () => void;
  origin: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  loading: boolean;
  error: string | null;
  distance: string;
  duration: string;
  setActiveField: (field: "origin" | "destination" | null) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  originRef,
  destinationRef,
  onLoad,
  locationSelected,
  handleRouteClick,
  handleClearClick,
  origin,
  destination,
  loading,
  error,
  distance,
  duration,
  setActiveField,
}) => {
  return (
    <Box
      p={4}
      borderRadius="lg"
      m={4}
      bgColor="white"
      shadow="base"
      minW="container.md"
      zIndex="1"
      boxShadow="lg"
      border="1px solid #e2e8f0"
    >
      <VStack spacing={4}>
        <HStack spacing={2} justifyContent="space-between" w="100%">
          <Box w={"35%"}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
              <Input
                type="text"
                placeholder="Click on the map or input origin"
                ref={originRef}
                onFocus={() => setActiveField("origin")}
                borderColor="gray.300"
                _focus={{ borderColor: "pink.500" }}
                flex="1"
              />
            </Autocomplete>
          </Box>
          <Box w={"35%"}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
              <Input
                type="text"
                placeholder="Click on the map or input destination"
                ref={destinationRef}
                onFocus={() => setActiveField("destination")}
                borderColor="gray.300"
                _focus={{ borderColor: "pink.500" }}
                flex="1"
              />
            </Autocomplete>
          </Box>
          <Tooltip label="Get Route" aria-label="Route Tooltip">
            <Button
              colorScheme="pink"
              onClick={handleRouteClick}
              isDisabled={!origin || !destination}
              variant="solid"
              _hover={{ bg: "pink.600" }}
              px={6}
            >
              {loading ? <Spinner size="sm" /> : "Route"}
            </Button>
          </Tooltip>
          <Tooltip label="Clear Route" aria-label="Clear Tooltip">
            <Button
              colorScheme="red"
              onClick={handleClearClick}
              isDisabled={!origin && !destination}
              variant="solid"
              _hover={{ bg: "red.600" }}
              px={6}
            >
              Clear
            </Button>
          </Tooltip>
        </HStack>
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            Distance: {distance}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Duration: {duration}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MapControls;
