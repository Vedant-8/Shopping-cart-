import axios from "axios";

const API_URL = "http://localhost:8080/api/reports/";

const getReport = () => {
  return axios.get(API_URL);
};

export default {
  getReport,
};
