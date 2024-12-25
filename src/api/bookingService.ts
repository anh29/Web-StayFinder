import apiClient from './apiClient';

export const bookRoom = async (
  roomId: string,
  data: { checkInDate: string; checkOutDate: string }
) => {
  const response = await apiClient.post(`/reservations/book/${roomId}`, data);
  return response.data;
};

export const cancelBooking = async (reservationId: string) => {
  const response = await apiClient.delete(`/reservations/cancel/${reservationId}`);
  return response.data;
};

export const createPayment = async (data: { reservationId: string }) => {
  const response = await apiClient.post('/orders/create', data);
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await apiClient.get('/transactions');
  return response.data;
};
