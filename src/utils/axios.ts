// utils/axios.instance.ts
import axios from "axios";
import ENV from "../conf/conf"; 


export const axiosInstance = axios.create({
  baseURL: `${ENV.API_BASE_URL}/api/v1`,
});
