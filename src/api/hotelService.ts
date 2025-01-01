import { Hotel } from "types/hotel";
import apiClient from "./apiClient";

export const getHotels = async (): Promise<Hotel[] | string> => {
  const response = await apiClient.get("/hotels/all");
  const { success = true } = response.data;
  if (!success) {
    return response.data.message;
  }

  return response.data;
};

export const getHotelById = async (id: string): Promise<Hotel | string> => {
  const response = await apiClient.get(`/hotels/detailhotel/${id}`);
  if (!response.data.success) {
    return response.data.message;
  }
  return response.data.data;
};