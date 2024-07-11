import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role); // Store the role in localStorage
  }
  return response.data;
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
  localStorage.removeItem("role"); // Remove role from localStorage on logout
};

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const getRole = () => {
  return localStorage.getItem("role"); // Retrieve the role from localStorage
};

export default {
  login,
  register,
  getProfile,
  logout,
  isAuthenticated,
  getRole,
};
