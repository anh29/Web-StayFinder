import apiClient from './apiClient';

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  country: string;
  phonenumber: string;
  role: string;
}) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Login failed, please try again.';
  }
};

export const resetPassword = async (data: { email: string}) => {
  const response = await apiClient.post('/auth/reset-password', data);
  return response.data;
};

export const sendVerifyEmail = async (data: { email: string; }) => {
  const response = await apiClient.post('/auth/send-verification-code', data);
  return response.data;
};

export const verifyCode = async (data: { email: string; code: string; }) => {
  const response = await apiClient.post('/auth/verify-email', data);
  return response.data;
};
