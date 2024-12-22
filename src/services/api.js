import axios from 'axios';

const API_URL = 'http://localhost:3012/api/v1';

export const fetchRooms = async () => {
  const response = await axios.get(`${API_URL}/rooms`);
  return response.data;
};

export const switchRoomLight = async (roomId) => {
  await axios.get(`${API_URL}/rooms/${roomId}/switchLight`);
};

export const fetchRoomById = async (roomId) => {
  const response = await axios.get(`${API_URL}/rooms/${roomId}`);
  return response.data;
}