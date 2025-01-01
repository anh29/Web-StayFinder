import { FilterOptions } from "types/config/filter";

export const constructFiltersFromQuery = (queryParams: any) => {
  const location = queryParams.get("location");
  const checkIn = queryParams.get("checkIn");
  const checkOut = queryParams.get("checkOut");
  const persons = queryParams.get("persons");

  const filters: FilterOptions = {
    location,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    guests: persons ? parseInt(persons) : 1,
  }
  return filters;
};
