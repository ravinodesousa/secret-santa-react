import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const generateSantaList = (file) => {
  return axios.post(`${baseURL}/generate-santa-list`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const saveGeneratedList = (data) => {
  return axios.post(`${baseURL}/save-santa-list`, data, {});
};

export const getSantaList = () => {
  return axios.get(`${baseURL}/santa-list`, {});
};
