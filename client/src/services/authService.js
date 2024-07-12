import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = async (username, password) => {
  try {
    console.log("Attempting login with username:", username); // Debug log
    const response = await axios.post(`${API_URL}/login`, { username, password });
    console.log("Login response:", response.data); // Debug log
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); // Store the role in localStorage
      console.log("Token and role stored in localStorage"); // Debug log
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error); // Error log
    throw new Error("Login failed. Please check your credentials.");
  }
};

const register = async (username, password, role) => {
  try {
    console.log("Attempting registration with username:", username, "and role:", role); // Debug log
    const response = await axios.post(`${API_URL}/register`, { username, password, role });
    console.log("Registration response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error); // Error log
    throw new Error("Registration failed. Please try again.");
  }
};

const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Fetching profile with token:", token); // Debug log
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Profile response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Fetching profile failed:", error); // Error log
    throw new Error("Fetching profile failed. Please try again.");
  }
};

const logout = () => {
  console.log("Logging out"); // Debug log
  localStorage.removeItem("token");
  localStorage.removeItem("role"); // Remove role from localStorage on logout
  console.log("Token and role removed from localStorage"); // Debug log
};

const isAuthenticated = () => {
  const authenticated = !!localStorage.getItem("token");
  console.log("Is authenticated:", authenticated); // Debug log
  return authenticated;
};

const getRole = () => {
  const role = localStorage.getItem("role"); // Retrieve the role from localStorage
  console.log("Retrieved role from localStorage:", role); // Debug log
  return role;
};

export default {
  login,
  register,
  getProfile,
  logout,
  isAuthenticated,
  getRole,
};
