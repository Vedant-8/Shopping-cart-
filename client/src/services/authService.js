import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

const register = (username, password, role) => {
  return axios.post(`${API_URL}/register`, { username, password, role });
};

const getProfile = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const logout = () => {
  localStorage.removeItem("token");
};

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const getRole = () => {
  // Decode token to get the role, this is a placeholder
  return "USER"; // Replace with actual decoding logic
};

export default {
  login,
  register,
  getProfile,
  logout,
  isAuthenticated,
  getRole,
};
