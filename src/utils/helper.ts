import { Hotel, Review, Room } from "types/data";
import { EnhancedHotel } from "types/enhancedData";

export const mapHotelToEnhanced = (
  hotel: Hotel,
  rooms: Room[],
  reviews: Review[]
): EnhancedHotel => {
  const hotelReviews = reviews.filter(
    (review) => review.hotelId === hotel.hotelId
  );

  const avgRating = hotelReviews.length
    ? hotelReviews.reduce((sum, review) => sum + review.rating, 0) /
      hotelReviews.length
    : 0;

  const roomPrices = rooms
    .filter((room) => room.hotelId === hotel.hotelId)
    .map((room) => room.price);

  return {
    hotelId: hotel.hotelId,
    name: hotel.name,
    location: hotel.location,
    images: hotel.images,
    facilities: hotel.facilities,
    description: "A wonderful place to stay!",
    rating: avgRating,
    priceRange: {
      min: Math.min(...roomPrices),
      max: Math.max(...roomPrices),
    },
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in.",
  };
};
