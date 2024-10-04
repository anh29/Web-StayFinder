// Define the Review type first
export type Review = {
  name?: string;
  rating?: number;
  comment?: string;
  [key: string]: any;
}

// Define the Room type (if you're planning to add room details)
export type roomType = {
  id?: number;
  type?: string;
  description?: string;
  maxOccupancy?: number;
  pricePerNight?: number;
  amenities?: string[];
  [key: string]: any;
}

export type Location = {
  city?: string;
  country?: string;
  address?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  [key: string]: any;
}

export type Policy = {
  cancellation?: string;
  checkIn?: string;
  checkOut?: string;
  [key: string]: any;
}

export type Contact = {
  email?: string;
  phone?: string;
  website?: string;
  [key: string]: any;
}

export type Availability = {
  date?: string;
  roomsAvailable?: number;
  [key: string]: any;
}

export type Attractions = {
  name?: string;
  description?: string;
  distance?: string;
  [key: string]: any;
}

// Define the Hotel type
export type Hotel = {
  id?: number;
  name?: string;
  description?: string;
  availability?: Availability[];
  roomTypes?: object;
  currency?: string;
  imageUrl?: string;
  location?: Location;
  pricePerNight?: number;
  rating?: number; // Overall rating
  amenities?: string[];
  reviews?: Review[]; // Array of reviews
  totalReviews?: number;
  rooms?: roomType[]; // Optional list of rooms
  availableDates?: {
    startDate?: string;
    endDate?: string;
  };
  nearbyAttractions?: Attractions[];
  policies?: Policy;
  contactInfo?: Contact;
  starRating?: number; // Star rating from 1 to 5
  isBooked?: boolean; // Optional flag to track if it's booked
}
