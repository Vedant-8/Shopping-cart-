const BASE_URL = "http://localhost:8080"; // Replace with your backend URL

const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json(); // Assuming backend returns user data or JWT token
};

const register = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json(); // Assuming backend returns success message
};

const authService = {
  login,
  register,
};

export default authService;
