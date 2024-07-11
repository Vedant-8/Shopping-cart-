import axios from "axios";

const API_URL = "http://localhost:8080/api/reports";

const getReports = () => {
  return axios.get(API_URL);
};

const createReport = (title, description) => {
  const token = localStorage.getItem("token");
  return axios.post(
    API_URL,
    { title, description },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export default {
  getReports,
  createReport,
};
