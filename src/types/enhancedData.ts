export type EnhancedHotel = {
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
  description: string;
  rating: number;
  priceRange: {
    min: number;
    max: number;
  };
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
};

export type EnhancedUser = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  bookings: EnhancedBooking[];
  profilePicture?: string;
};

export type EnhancedReview = {
  reviewId: string;
  hotelId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
  userName: string;
};

export type EnhancedAvailability = {
  hotelId: string;
  roomId: string;
  availability: {
    startDate: string;
    endDate: string;
    roomsAvailable: number;
    pricePerNight: number;
  }[];
};

export type EnhancedBooking = {
  bookingId: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  currency: string;
  status: "confirmed" | "pending" | "cancelled";
  createdDate: string;
};

export type EnhancedPaymentMethod =
  | "Credit Card"
  | "Debit Card"
  | "PayPal"
  | "Bank Transfer"
  | "Apple Pay"
  | "Google Pay"
  | "Cryptocurrency";

export type EnhancedPromotion = {
  promotionId: string;
  hotelId: string;
  description: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  promoCode?: string;
};

export type EnhancedPolicy = {
  hotelId: string;
  policy: string;
  checkInPolicy: string;
  checkOutPolicy: string;
};
