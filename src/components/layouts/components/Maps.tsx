import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box, Text, Spinner, Link } from '@chakra-ui/react';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const initialCenter = {
  lat: 16.07367142466572,
  lng: 108.1498646736145,
};

// Define props interface
interface MapsProps {
  lat?: number; // Optional lat prop
  lng?: number; // Optional lng prop
}

const Maps: React.FC<MapsProps> = ({ lat, lng }) => {
  const [mapCenter, setMapCenter] = useState({ lat: lat || initialCenter.lat, lng: lng || initialCenter.lng });
  const [locationInfo, setLocationInfo] = useState<string | null>('Loading location info...');
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Fetch location information using Geocoder
  const fetchLocationInfo = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    try {
      const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results) {
            resolve(results);
          } else {
            reject(status);
          }
        });
      });

      if (results && results[0]) {
        setLocationInfo(results[0].formatted_address);
      } else {
        setLocationInfo('Location information not available.');
      }
    } catch (error) {
      console.error('Error fetching location info:', error);
      setLocationInfo('Error fetching location information.');
    }
  };

  useEffect(() => {
    // Fetch location info on center change
    fetchLocationInfo(mapCenter.lat, mapCenter.lng);

    // Adjust map center position if the map is loaded
    if (mapRef.current) {
      mapRef.current.setCenter(mapCenter);
    }

    return () => {
      if (mapRef.current) {
        google.maps.event.clearListeners(mapRef.current, 'dragend');
      }
    };
  }, [mapCenter]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newCenter = event.latLng?.toJSON();
    if (newCenter) {
      setMapCenter(newCenter);
      if (markerRef.current) {
        markerRef.current.setPosition(newCenter);
      }
    }
  };

  const generateGoogleMapsLink = (lat: number, lng: number) => {
    // Google Maps link without CID (using only latitude and longitude)
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <Box mt={8} p={4} bg="white" display={'block'} borderRadius="lg" boxShadow="xl" position="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={16}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
      >
        {/* Marker with draggable capability */}
        <Marker
          position={mapCenter}
          draggable={true}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(40, 40),
          }}
          onDragEnd={() => {
            if (markerRef.current && markerRef.current.getPosition()) {
              const position = markerRef.current.getPosition();
              const newLatLng = position?.toJSON();
              if (newLatLng) {
                setMapCenter(newLatLng);
              }
            }
          }}
        />
        
        {/* Location Info Overlay (Text View on Map) */}
        <Box
          position="absolute"
          top="20%"
          left="50%"
          transform="translateX(-50%)"
          zIndex={10}
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="lg"
          borderColor="#06B3C4"
          borderWidth="2px"
          width={{ base: '90%', sm: '80%', md: '70%' }} // Make the width responsive
          maxWidth="300px" // Ensure the box doesn't stretch too wide
          textAlign="center"
          // Add the triangle to the bottom using the ::after pseudo-element
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-10px', // Move the triangle below the Box
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '10px solid #06B3C4', // Color of the triangle
          }}
        >
          {/* Conditionally render location info */}
          {locationInfo ? (
            <Box>
              <Link
                href={generateGoogleMapsLink(mapCenter.lat, mapCenter.lng)}
                isExternal
                color="blue.500"
                fontSize={{ base: 'sm', md: 'md' }} // Responsive font size
                fontWeight="medium"
                mt={2}
              >
                Click here to view the location
              </Link>
              <Text mt={2} fontSize="sm" color="gray.600" noOfLines={3}>
                {locationInfo}
              </Text>
            </Box>
          ) : (
            <Box textAlign="center">
              <Spinner size="md" color="blue.500" />
              <Text mt={2}>Loading...</Text>
            </Box>
          )}
        </Box>
      </GoogleMap>
    </Box>
  );
};

export default Maps;
