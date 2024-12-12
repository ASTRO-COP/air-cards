import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.3:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

export const fetchData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: unknown) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const updateData = async (endpoint: string, data: unknown) => {
  try {
    const response = await apiClient.put(endpoint, data); // Use PATCH if partial updates are allowed
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (err) {
    console.error('Error deleting data: ', err);
    throw err;
  }
}