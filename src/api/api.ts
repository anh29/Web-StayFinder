import {
  Hotel,
  Room,
  Review,
  User,
  Availability,
  Amenities,
  Booking,
  Promotion,
  Policy,
  ReviewHash,
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
  return fetchData<User[]>("/data/user.json");
};

export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const allUsers: User[] = await fetchData<User[]>("/data/user.json");
    const user = allUsers.find((user) => user.userId === userId);
    return user || null;
  } catch (error) {
    throw new Error("Could not fetch user");
  }
};

export const fetchReviews = async (): Promise<Review[]> => {
  return fetchData<Review[]>("/data/review.json");
};
// // api/api.ts
// import { Review } from "types/review";

export const fetchReviewsByRoomId = async (roomId: string): Promise<ReviewHash[]> => {
  // Simulating API call
  return [
    {
      userHash: "abc1234xyz",
      content: "Great room, very comfortable and spacious!",
      rating: 5,
      imgUrl: "https://t3.ftcdn.net/jpg/06/19/00/08/360_F_619000872_AxiwLsfQqRHMkNxAbN4l5wg1MsPgBsmo.jpg",
      timestamp: "2024-10-01T12:00:00Z",
    },
    {
      userHash: "def5678uvw",
      content: "Clean and cozy, but a bit noisy at night.",
      rating: 3,
      imgUrl:"https://images.unsplash.com/photo-1631049552057-403cdb8f0658?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
      timestamp: "2024-09-15T09:00:00Z",
    },
    {
      userHash: "ghi9101rst",
      content: "Fantastic location, great view, would stay again.",
      rating: 4,
      imgUrl: "https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg",
      timestamp: "2024-08-20T15:30:00Z",
    },
  ];
};

export const fetchAmenities = async (): Promise<Amenities> => {
  return fetchData<Amenities>("/data/amenities.json");
};

export const fetchAvailability = async (): Promise<Availability[]> => {
  return fetchData<Availability[]>("/data/availability.json");
};

export const fetchBookings = async (userId: string): Promise<Booking[]> => {
  try {
    const allBookings: Booking[] = await fetchData<Booking[]>(
      "/data/booking.json"
    );
    return allBookings.filter((booking) => booking.userId === userId);
  } catch (error) {
    return [];
  }
};

export const fetchPromotions = async (): Promise<Promotion[]> => {
  return fetchData<Promotion[]>("/data/promotions.json");
};

export const fetchCancellationPolicies = async (): Promise<Policy[]> => {
  return fetchData<Policy[]>("/data/policy.json");
};

export const getAllCities = async (): Promise<string[]> => {
  const hotels = await fetchHotels();
  const cities = hotels.map((hotel) => hotel.location.city);

  return Array.from(new Set(cities));
};

export const fetchHotelById = async (
  hotelId: string
): Promise<Hotel | null> => {
  const hotels = await fetchHotels();
  return hotels.find((hotel) => hotel.hotelId === hotelId) || null;
};

export const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  const rooms = await fetchRooms();
  return rooms.find((room) => room.roomId === roomId) || null;
};

export const fetchRoomsByHotelId = async (hotelId: string): Promise<Room[]> => {
  const rooms = await fetchRooms();
  return rooms.filter((room) => room.hotelId === hotelId);
};
