export type SearchFilters = {
  location?: string;
  date?: string;
  priceRange?: { min: number; max: number };
  checkInDate?: string;
  available?: string;
  checkOutDate?: string;
  rating?: number; // minimum rating
  amenities?: string[];
  sortBy?: 'popularity' | 'price' | 'rating';
};
