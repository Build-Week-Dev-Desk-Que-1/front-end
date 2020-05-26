import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseUrl: "backend here",
    headers: {
      Authorization: token,
    },
  });
};