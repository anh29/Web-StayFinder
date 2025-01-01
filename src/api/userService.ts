import formDataClient from "./formatDataClient";


export const reviewByRoomId = async (formData: FormData): Promise<any> => {
  try {
    const response = await formDataClient.post('/reviews', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
