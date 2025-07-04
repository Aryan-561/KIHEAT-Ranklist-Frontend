// utils/axios.instance.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4444/api/v1",
});
