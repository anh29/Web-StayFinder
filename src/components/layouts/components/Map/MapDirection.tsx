import React, { useState, useRef } from "react";
import {
  SkeletonText,
  Flex,
  Box,
  VStack,
  Heading,
} from "@chakra-ui/react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "index";
import { calculateRoute, handleMapLoad, handleMapClick } from "./MapHelper";
import CustomToast from "../../../elements/CustomToast";
import MapControls from "./MapControls";


const center = { lat: 16.073671, lng: 108.149865 };

const LOCATIONS = [
  {
    name: "Da Nang University of Science and Technology",
    lat: 16.073671,
    lng: 108.149865,
  },
  { name: "Student Dormitory", lat: 16.072434, lng: 108.153598 },
  { name: "Thanh Long Motel", lat: 16.07763, lng: 108.167267 },
  { name: "Le House Hotel", lat: 16.077424, lng: 108.164606 },
];

const MapDirection = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],
  });

  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const [mapKey, setMapKey] = useState(0);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [destination, setDestination] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [activeField, setActiveField] = useState<
    "origin" | "destination" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ title: string; description?: string; variant: "success" | "error" | "info" | "warning" } | null>(null);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const handleRouteClick = async () => {
    if (!origin || !destination) {
      setToast({
        title: "Error",
        description: "Please select both origin and destination.",
        variant: "error",
      });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await calculateRoute(
        origin,
        destination,
        setDirectionsResponse,
        setDistance,
        setDuration,
        null
      );
    } catch (err) {
      setError("Unable to calculate the route.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearClick = () => {
    setOrigin(null);
    setDestination(null);
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setError(null);

    if (originRef.current) originRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";

    setMapKey((prevKey) => prevKey + 1);
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete);
  };
  const locationSelected = () => {
    if (searchResult) {
      const place = searchResult.getPlace();
      const lat = place.geometry?.location.lat();
      const lng = place.geometry?.location.lng();
      const name = place.name;
      if (lat && lng && name) {
        if (activeField === "origin") {
          setOrigin({ lat, lng });
          if (originRef.current) originRef.current.value = name;
        } else {
          setDestination({ lat, lng });
          if (destinationRef.current) destinationRef.current.value = name;
        }
      }
    }
  };

  const handleMarkerClick = (location: { lat: number; lng: number }) => {
    console.log("Marker clicked:", location);
  };

  const renderMap = () => (
    <GoogleMap
      key={mapKey}
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={(map) => handleMapLoad(map, LOCATIONS)}
      onClick={(e) =>
        handleMapClick(
          e,
          activeField,
          setOrigin,
          setDestination,
          originRef,
          destinationRef
        )
      }
    >
      {LOCATIONS.map((loc, index) => (
        <Marker
          key={index}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
          onClick={() => handleMarkerClick({ lat: loc.lat, lng: loc.lng })}
        />
      ))}
      {origin && <Marker position={origin} label="A" />}
      {destination && <Marker position={destination} label="B" />}
      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  );

  if (!isLoaded) {
    return <SkeletonText height="20px" width="60%" my="20px" />;
  }

  return (
    <Box id="directions" pt={10}>
      {toast && (
        <CustomToast
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <Heading size="lg" mb={6} textAlign="center">
        Direction
      </Heading>
      <Flex
        id="directions"
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="80vh"
        justifySelf={"center"}
        w="90vw"
        margin="20px"
        border="10px solid white"
        borderRadius="10px"
        boxShadow="lg"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {renderMap()}
        </Box>
        <MapControls
          originRef={originRef}
          destinationRef={destinationRef}
          onLoad={onLoad}
          locationSelected={locationSelected}
          handleRouteClick={handleRouteClick}
          handleClearClick={handleClearClick}
          origin={origin}
          destination={destination}
          loading={loading}
          error={error}
          distance={distance}
          duration={duration}
          setActiveField={setActiveField}
        />
      </Flex>
    </Box>
  );
};

export default MapDirection;
