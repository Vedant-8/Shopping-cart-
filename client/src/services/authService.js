import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, password, role) => {
  return axios.post(API_URL + "register", {
    username,
    password,
    role,
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "login", {
    username,
    password,
  });
};

export default {
  register,
  login,
};
