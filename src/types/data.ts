export type Hotel = {
  hotelId: string;
  name: string;
  location: {
    country: string;
    city: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  images: string[];
  facilities: string[];
};

export type Room = {
  roomId: string;
  hotelId: string;
  type: string;
  price: number;
  currency: string;
  capacity: number;
  amenities: string[];
  images: string[];
};

export type User = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  bookings: Booking[];
};

export type Review = {
  reviewId: string;
  hotelId: string;
  userId: string;
  rating: number; // e.g., between 1 and 5
  comment: string;
};

export type Amenities = {
  amenities: string[]
};

export type Availability = {
  hotelId: string;
  roomId: string;
  availability: {
    startDate: string;
    endDate: string;
    roomsAvailable: number;
  }[];
};

export type Booking = {
  bookingId: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'cancelled';
};

export type Promotion = {
  promotionId: string;
  hotelId: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type Policy = {
  hotelId: string;
  policy: string;
};
