import apiClient from "./apiClient";

export const getHotels = async () => {
  const response = await apiClient.get('/hotels/all');
  return response.data;
}