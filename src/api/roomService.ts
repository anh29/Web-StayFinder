import { FilterOptions } from 'types/config/filter';
import apiClient from './apiClient';
import { HotelFilter } from 'types/hotel';
import { getHotelById } from './hotelService';
import { EnhancedRoom } from 'types/room';
import { Review } from 'types/user';

export const searchRooms = async (data: FilterOptions) : Promise<HotelFilter[] | string> => {
  const response = await apiClient.post('/rooms/search', data);
  const { success = true } = response.data;
  if (!success) {
    return response.data.message;
  }
  const hotelMap: { [key: string]: HotelFilter } = {};
  const minPrice = Math.min(...response.data.data.map((room: any) => room.price));
  for (const room of response.data.data) {
    if (!hotelMap[room.hotel]) {
      const hotelDetails = await getHotelById(room.hotel);
      if (typeof hotelDetails === 'string') {
        return hotelDetails;
      }
      hotelMap[room.hotel] = { hotel: hotelDetails, roomIds: [], price: minPrice };
    }
    hotelMap[room.hotel].roomIds.push(room._id);
  }

  const filteredData = Object.values(hotelMap);

  return filteredData;
};

export const getRoomDetails = async (roomId: string) : Promise<EnhancedRoom | string>=> {
  const response = await apiClient.get(`/rooms/detailroom/${roomId}`);
  const { success = true, data = {} } = response.data;
  if (!success) {
    return response.data.message;
  }
  const hotelDetails = await getHotelById(data.hotel);
  const reviews = await getReviewByRoomId(roomId);

  return { room: data, hotel: hotelDetails, reviews };
};

export const getReviewByRoomId = async (roomId: string) : Promise<Review[] | string> => {
  try {
  const response = await apiClient.get(`/reviews/review/${roomId}`);
  return response.data;
  } catch (error) {
    return "No reviews found";
  }
}