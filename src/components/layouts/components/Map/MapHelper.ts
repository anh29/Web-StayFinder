export const geocodeLatLng = async (
  lat: number,
  lng: number,
  setField: React.Dispatch<React.SetStateAction<string | null>>,
  options: { resultIndex?: number } = { resultIndex: 0 }
) => {
  const geocoder = new google.maps.Geocoder();
  const latLng = { lat, lng };

  try {
    const { results } = await geocoder.geocode({ location: latLng });
    const result = results[options.resultIndex || 0];
    if (result) {
      setField(result.formatted_address);
    } else {
      setField("Unknown location");
    }
  } catch (error) {
    console.error("Geocoding failed:", error);
    setField("Error fetching location");
  }
};

export async function calculateRoute(
  origin: { lat: number; lng: number } | null,
  destination: { lat: number; lng: number } | null,
  setDirectionsResponse: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | null>>,
  setDistance: React.Dispatch<React.SetStateAction<string>>,
  setDuration: React.Dispatch<React.SetStateAction<string>>,
  directionsRenderer: google.maps.DirectionsRenderer | null
) {
  if (!origin || !destination) return;

  const directionsService = new google.maps.DirectionsService();

  try {
    // Clear previous directions if there's any existing renderer
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }

    const results = await directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    // Create a new DirectionsRenderer instance and display the new route
    const newDirectionsRenderer = new google.maps.DirectionsRenderer({
      directions: results,
    });
    newDirectionsRenderer.setMap(directionsRenderer?.getMap()); // Re-add it to the map

  } catch (error) {
    console.error("Error calculating route: ", error);
  }
}

// Function to handle map load and set markers
export function handleMapLoad(
  map: google.maps.Map,
  locations: { name: string; lat: number; lng: number }[]
) {
  // Add markers after map load
  locations.forEach((loc) => {
    new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.name,
    });
  });
}

// Function to handle map click
export function handleMapClick(
  event: google.maps.MapMouseEvent,
  activeField: "origin" | "destination" | null,
  setOrigin: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>,
  setDestination: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>,
  originRef: React.RefObject<HTMLInputElement>,
  destinationRef: React.RefObject<HTMLInputElement>
) {
  if (!event.latLng || !activeField) return;

  const clickedLocation = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
console.log('event', event)
  if (activeField === "origin") {
    setOrigin(clickedLocation);
    if (originRef.current) {
      originRef.current.value = `${clickedLocation.lat}, ${clickedLocation.lng}`;
    }
  } else if (activeField === "destination") {
    setDestination(clickedLocation);
    if (destinationRef.current) {
      destinationRef.current.value = `${clickedLocation.lat}, ${clickedLocation.lng}`;
    }
  }
}

// Function to clear route and reset states
export function clearRouteLogic(
  originRef: React.RefObject<HTMLInputElement>,
  destinationRef: React.RefObject<HTMLInputElement>,
  setDirectionsResponse: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | null>>,
  setDistance: React.Dispatch<React.SetStateAction<string>>,
  setDuration: React.Dispatch<React.SetStateAction<string>>,
  setOrigin: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>,
  setDestination: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>
) {
  setDirectionsResponse(null);
  setDistance("");
  setDuration("");
  setOrigin(null);
  setDestination(null);
  if (originRef.current) originRef.current.value = "";
  if (destinationRef.current) destinationRef.current.value = "";
}
