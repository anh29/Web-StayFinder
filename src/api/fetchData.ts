
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
): Promise<EnhancedHotel[]> => {
  return [];
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
        currency: "VND",
        status: "confirmed",
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
