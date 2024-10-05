import { SearchFilters } from "types/config/filter";
import { Availability, Hotel, Review, Room } from "types/data";
import { EnhancedHotel } from "types/enhancedData";
import {
  fetchAvailability,
  fetchHotelById,
  fetchHotels,
  fetchReviews,
  fetchRoomById,
  fetchRooms,
  fetchRoomsByHotelId,
} from "./api";
import { mapHotelToEnhanced } from "utils/helper";

export const fetchEnhancedHotelsByFilters = async (
  filters: SearchFilters
): Promise<EnhancedHotel[]> => {
  const hotels: Hotel[] = await fetchHotels();
  const reviews: Review[] = await fetchReviews();
  const rooms: Room[] = await fetchRooms();
  const availability: Availability[] = await fetchAvailability();

  let filteredHotels = hotels;

  if (filters.location) {
    filteredHotels = filteredHotels.filter(
      (hotel) =>
        hotel.location.city
          .toLowerCase()
          .includes(filters.location!.city.toLowerCase()) ||
        hotel.location.country
          .toLowerCase()
          .includes(filters.location!.country.toLowerCase())
    );
  }

  if (filters.startDate && filters.endDate) {
    filteredHotels = filteredHotels.filter((hotel) =>
      availability.some(
        (avail) =>
          avail.hotelId === hotel.hotelId &&
          avail.availability.some(
            (slot) =>
              new Date(slot.startDate) <= new Date(filters.startDate!) &&
              new Date(slot.endDate) >= new Date(filters.endDate!) &&
              slot.roomsAvailable > 0
          )
      )
    );
  }

  if (filters.persons) {
    filteredHotels = filteredHotels.filter((hotel) =>
      rooms.some(
        (room) =>
          room.hotelId === hotel.hotelId &&
          room.capacity >= Number(filters.persons)
      )
    );
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filteredHotels = filteredHotels.filter((hotel) =>
      filters.amenities!.every((amenity) => hotel.facilities.includes(amenity))
    );
  }

  if (filters.rating) {
    const hotelRatings = reviews.reduce(
      (acc: { [hotelId: string]: number[] }, review) => {
        if (!acc[review.hotelId]) {
          acc[review.hotelId] = [];
        }
        acc[review.hotelId].push(review.rating);
        return acc;
      },
      {}
    );

    filteredHotels = filteredHotels.filter((hotel) => {
      const ratings = hotelRatings[hotel.hotelId];
      if (ratings) {
        const avgRating =
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        return avgRating >= filters.rating!;
      }
      return false;
    });
  }

  const enhancedHotels = filteredHotels.map((hotel) =>
    mapHotelToEnhanced(hotel, rooms, reviews)
  );

  return enhancedHotels;
};

export const fetchEnhancedHotels = async (): Promise<EnhancedHotel[]> => {
  const hotels: Hotel[] = await fetchHotels();
  const reviews: Review[] = await fetchReviews();
  const rooms: Room[] = await fetchRooms();

  return hotels.map((hotel) => mapHotelToEnhanced(hotel, rooms, reviews));
};

export const fetchEnhancedHotelById = async (
  hotelId: string
): Promise<EnhancedHotel | null> => {
  console.log("hotelId", hotelId);
  const hotel = await fetchHotelById(hotelId);
  if (!hotel) return null;

  const reviews: Review[] = await fetchReviews();
  const rooms: Room[] = await fetchRooms();

  return mapHotelToEnhanced(hotel, rooms, reviews);
};

export const fetchEnhancedRoomById = async (
  roomId: string
): Promise<Room | null> => {
  const room = await fetchRoomById(roomId);
  return room;
};

export const fetchEnhancedRoomsByHotelId = async (
  hotelId: string
): Promise<Room[]> => {
  const rooms: Room[] = await fetchRoomsByHotelId(hotelId);
  return rooms;
};
