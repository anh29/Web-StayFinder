export type SearchFilters = {
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  priceRange?: { min: number; max: number };
  checkInDate?: string;
  startDate?: string;
  endDate?: string;
  checkOutDate?: string;
  rating?: number;
  amenities?: string[];
  sortBy?: "popularity" | "price" | "rating";
  persons?: number;
};
