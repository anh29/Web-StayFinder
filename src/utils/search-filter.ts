import { SearchFilters } from "types/config/filter";

export const constructFiltersFromQuery = (queryParams: any) => {
  const filters: Partial<SearchFilters> = {};

  const city = queryParams.get("city");
  const country = queryParams.get("country");
  if (city || country) {
    filters.location = {
      city: city || undefined,
      country: country || undefined,
    };
  }

  const checkInDate = queryParams.get("startDate");
  const checkOutDate = queryParams.get("endDate");
  if (checkInDate || checkOutDate) {
    filters.checkInDate = checkInDate || undefined;
    filters.checkOutDate = checkOutDate || undefined;
  }

  const persons = queryParams.get("persons");
  if (persons) {
    filters.persons = parseInt(persons);
  }

  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  if (minPrice || maxPrice) {
    filters.priceRange = {
      min: minPrice ? parseFloat(minPrice) : undefined,
      max: maxPrice ? parseFloat(maxPrice) : undefined,
    };
  }

  const amenities = queryParams.get("amenities");
  if (amenities) {
    filters.amenities = amenities.split(",");
  }

  const rating = queryParams.get("minRating");
  if (rating) {
    filters.rating = parseFloat(rating);
  }

  return filters;
};
