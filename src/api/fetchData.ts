import { SearchFilters } from "types/config/filter";
import { Availability, Booking, Hotel, Review, Room, User } from "types/data";
import {
  EnhancedBooking,
  EnhancedHotel,
  EnhancedUser,
} from "types/enhancedData";
import {
  fetchAvailability,
  fetchBookings,
  fetchHotelById,
  fetchHotels,
  fetchReviews,
  fetchRoomById,
  fetchRooms,
  fetchRoomsByHotelId,
  fetchUserById,
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

export const fetchEnhancedBookingsByUserId = async (
  userId: string
): Promise<EnhancedBooking[]> => {
  try {
    const allBookings: Booking[] = await fetchBookings(userId);

    const enhancedBookings: EnhancedBooking[] = [];

    for (const booking of allBookings) {
      const hotel: Hotel | null = await fetchHotelById(booking.hotelId);
      const room: Room | null = await fetchRoomById(booking.roomId);

      const enhancedBooking: EnhancedBooking = {
        bookingId: booking.bookingId,
        userId: booking.userId,
        hotelId: booking.hotelId,
        roomId: booking.roomId,
        hotelName: hotel ? hotel.name : "Updating",
        roomType: room ? room.type : "Updating",
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        totalGuests: room ? room.capacity : 1,
        roomImage: room && room.images.length > 0 ? room.images[0] : "",
        totalPrice: booking.totalPrice,
        currency: booking.currency,
        status: booking.status,
      };

      enhancedBookings.push(enhancedBooking);
    }

    return enhancedBookings;
  } catch (error) {
    console.error("Error fetching enhanced bookings:", error);
    return [];
  }
};

export const fetchEnhancedUserById = async (
  userId: string
): Promise<EnhancedUser | null> => {
  try {
    const user = await fetchUserById(userId);
    if (!user) return null;

    const bookings = await fetchEnhancedBookingsByUserId(userId);

    const enhancedUser: EnhancedUser = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      bookings,
    };

    return enhancedUser;
  } catch (error) {
    return null;
  }
};
