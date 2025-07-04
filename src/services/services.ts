import type {
  StudentByNameResponse,
  StudentByEnrollmentResponse,
  ErrorResponse,
  Programme
} from "./../interface/index";
import { axiosInstance } from "../utils/axios";
import { AxiosError } from "axios";

class Service {
  // Get students by name and programme
  async getStudentsByName(
    name: string,
    programme: string
  ): Promise<StudentByNameResponse | ErrorResponse> {
    try {
      const response = await axiosInstance.get<StudentByNameResponse>(
        `/student/search-by-name`,
        {
          params: { name, programme },
        }
      );

      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        status: "error",
        message:
          axiosError.response?.data?.message || "Something went wrong",
      };
    }
  }

  // Get a single student by enrollment number
  async getStudentByEnrollment(
    enrollment: string
  ): Promise<StudentByEnrollmentResponse | ErrorResponse> {
    try {
      const response = await axiosInstance.get<StudentByEnrollmentResponse>(
        `/student/${enrollment}`,

      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        status: "error",
        message:
          axiosError.response?.data?.message || "Something went wrong",
      };
    }
  }

  async getProgrammeResult(programme: string, batch: string): Promise<Programme | ErrorResponse> {
    try {
      const res = await axiosInstance.get<Programme>(`/programme/${programme}/${batch}`)
      console.log(res);

      return res.data

    } catch (error: unknown) {

      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        status: "error",
        message:
          axiosError.response?.data?.message || "Something went wrong",
      };

    }
  }
}

export const services = new Service();
