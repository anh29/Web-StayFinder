import apiClient from './apiClient';

export const searchRooms = async (data: {
  location: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}) => {
  const response = await apiClient.post('/rooms/search', data);
  return response.data;
};

export const getRoomDetails = async (roomId: string) => {
  const response = await apiClient.get(`/rooms/detailroom/${roomId}`);
  return response.data;
};
