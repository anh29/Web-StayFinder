import { Hotel } from "types/hotels";

export const getTopHotels = ({hotels, top} : {hotels: Hotel[], top: number}): Hotel[] => {
  return hotels.sort((a, b) => b.rating - a.rating).slice(0, top);
};