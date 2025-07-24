// utils/axios.instance.ts
import axios from "axios";
import ENV from "../conf/conf"; 

console.log("🔗 Axios Base URL:", ENV.API_BASE_URL);

export const axiosInstance = axios.create({
  baseURL: `${ENV.API_BASE_URL}/api/v1`,
});
