import { SearchFilters } from "types/config/filter";
import {
  Hotel,
  Room,
  Review,
  User,
  Availability,
  Amenities,
  Booking,
  PaymentMethod,
  Promotion,
  Policy,
} from "types/data";

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
};

export const fetchHotels = async (): Promise<Hotel[]> => {
  return fetchData<Hotel[]>("/data/hotels.json");
};

export const fetchRooms = async (): Promise<Room[]> => {
  return fetchData<Room[]>("/data/rooms.json");
};

export const fetchUsers = async (): Promise<User[]> => {
  return fetchData<User[]>("/data/users.json");
};

export const fetchReviews = async (): Promise<Review[]> => {
  return fetchData<Review[]>("/data/reviews.json");
};

export const fetchAmenities = async (): Promise<Amenities> => {
  return fetchData<Amenities>("/data/amenities.json");
};

export const fetchAvailability = async (): Promise<Availability[]> => {
  return fetchData<Availability[]>("/data/availability.json");
};

export const fetchBookings = async (): Promise<Booking[]> => {
  return fetchData<Booking[]>("/data/bookings.json");
};

export const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  return fetchData<PaymentMethod[]>("/data/payment_methods.json");
};

export const fetchPromotions = async (): Promise<Promotion[]> => {
  return fetchData<Promotion[]>("/data/promotions.json");
};

export const fetchCancellationPolicies = async (): Promise<Policy[]> => {
  return fetchData<Policy[]>("/data/policy.json");
};

export const fetchHotelsByFilters = async (filters: SearchFilters): Promise<Hotel[]> => {
  const hotels = await fetchHotels();

  if (filters.location) {
    return hotels.filter((hotel) =>
      hotel.location.city.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  return hotels;
};

// Function to get all unique cities from hotels data
export const getAllCities = async (): Promise<string[]> => {
  const hotels = await fetchHotels(); // Fetch all hotels
  const cities = hotels.map(hotel => hotel.location.city); // Extract all cities

  // Return unique cities by creating a Set and converting it back to an array
  return Array.from(new Set(cities));
};
