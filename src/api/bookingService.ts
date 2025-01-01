import { BookingParams } from 'types/booking';
import apiClient from './apiClient';

export const bookRoom = async (
  roomId: string,
  data: BookingParams,
) => {
  const response = await apiClient.post(`/reservations/book/${roomId}`, data);
  const reservationId = response.data.data._id;
  const orders = await createPayment({ reservationId });

  return orders;
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
  const response = await apiClient.get('transaction/customer');
  return response.data;
};
