import { EnhancedHotel } from "types/enhancedData";

export const getTopHotels = ({
  hotels,
  top,
}: {
  hotels: EnhancedHotel[];
  top: number;
}): EnhancedHotel[] => {
  return hotels.sort((a, b) => b.rating - a.rating).slice(0, top);
};
