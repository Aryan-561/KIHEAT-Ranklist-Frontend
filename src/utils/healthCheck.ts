import { axiosInstance } from "./axios";

// src/utils/healthCheck.ts
export const checkHealth = async () => {
  try {
    await axiosInstance.get('/health')
    console.log('✅ Health check successful');
  } catch (err) {
    console.error('❌ Health check failed', err);
  }
};
