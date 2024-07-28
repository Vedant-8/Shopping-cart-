import axios from "axios";

const API_URL = "http://localhost:8080/api/messages";

const sendMessage = async (message) => {
  const response = await axios.post(API_URL, { message });
  return response.data;
};

export default {
  sendMessage,
};
