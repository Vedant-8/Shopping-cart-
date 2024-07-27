import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};

const register = async (username, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
};

const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Fetching profile failed. Please try again.");
  }
};

const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Updating profile failed. Please try again.");
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

const isAuthenticated = () => {
  const authenticated = !!localStorage.getItem("token");
  return authenticated;
};

const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
};

export default {
  login,
  register,
  getProfile,
  updateProfile,
  logout,
  isAuthenticated,
  getRole,
};
