export type Hotel = {
  hotelId: string;
  name: string;
  description: string;
  location: {
    country: string;
    city: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  rating: number;
  totalReviews: number;
  priceRange: { min: number; max: number };
  currency: string;
  amenities: string[];
  images: string[];
  facilities: string[];
};

export type Room = {
  roomId: string;
  hotelId: string;
  roomType: string;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  maxGuests: number;
  bedType: string;
  size: number; // in square meters
  description: string;
  images: string[];
};

export type User = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  profileImage: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  bookingHistory: Booking[];
};

export type Review = {
  reviewId: string;
  hotelId: string;
  userId: string;
  rating: number; // e.g., between 1 and 5
  comment: string;
  date: string; // ISO format
};

export type Amenities = string[];

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

export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'PayPal' | 'Bank Transfer' | 'Apple Pay' | 'Google Pay';

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
