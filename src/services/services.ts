import type {
  StudentByNameResponse,
  StudentByEnrollmentResponse,
  ErrorResponse,
  Programme,
  ProgrammeBatchesResponse,
  TopStudentsResponse
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
        statusCode: axiosError.response?.status || 500,
        message:
          axiosError.response?.data?.message || "Something went wrong",
          success: false,
      };
    }
  }

  // Get a single student by enrollment number
  async getStudentByEnrollment(
    enrollment: string
  ): Promise<StudentByEnrollmentResponse> {
    try {
      const response = await axiosInstance.get<StudentByEnrollmentResponse>(
        `/student/${enrollment}`
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      throw new Error(
        axiosError.response?.data?.message || "Something went wrong"
      );
    }
  }


  async getTopStudents():Promise<TopStudentsResponse>{
    try{
      const res = await axiosInstance.get<TopStudentsResponse>('/student/top-students');
      return res.data;
    }
    catch (error: unknown) {
          const axiosError = error as AxiosError<{ message?: string }>;
          throw new Error(
            axiosError.response?.data?.message || "Something went wrong"
          );
    }
  }
  async getProgrammeBatches(programme: string): Promise<ProgrammeBatchesResponse> {
    try {
      const res = await axiosInstance.get<ProgrammeBatchesResponse>(`/programme/${programme}`);
      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch programme batches");
      }
      return res.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      throw new Error(
        axiosError.response?.data?.message || "Something went wrong while fetching programme batches"
      );
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
        statusCode: axiosError.response?.status || 500,
        message:
          axiosError.response?.data?.message || "Something went wrong",
          success: false,
      };

    }
  }


}

export const services = new Service();
