import axios from "axios";
import {
  GetAdmissionNoAvaibilityResponse,
  HandleAdmissionRequest,
  HandleAdmissionResponse,
  HandleStudentUpdateRequest,
  HandleStudentUpdateResponse,
  UnregisterStudentResponse,
} from "types";

const API = process.env.REACT_APP_API;

export function useFirebaseFunctions() {
  const getAdmissionNoAvaibility = async (admissionNo: string) => {
    const response = await axios.get(
      `${API}/v1/student/check-availability/${admissionNo}`
    );

    const data: GetAdmissionNoAvaibilityResponse = response.data;

    return data;
  };

  const handleAdmissionRequest = async (
    admissionNo: string,
    input: HandleAdmissionRequest
  ) => {
    const URL = `${API}/v1/student/admission/`;
    const response = await axios.post(URL, { data: input });
    const data: HandleAdmissionResponse = response.data;
    return data;
  };

  const handleStudentUpdateRequest = async (
    admissionNo: string,
    input: HandleStudentUpdateRequest
  ) => {
    const URL = `${API}/v1/student/update/${admissionNo}`;
    const response = await axios.post(URL, { data: input });
    const data: HandleStudentUpdateResponse = response.data;
    return data;
  };

  const handleStudentUnregisterRequest = async (admissionNo: string) => {
    const URL = `${API}/v1/student/unregister/${admissionNo}`;
    const response = await axios.delete(URL);
    const data: UnregisterStudentResponse = response.data;
    return data;
  };

  return {
    getAdmissionNoAvaibility,
    handleAdmissionRequest,
    handleStudentUpdateRequest,
    handleStudentUnregisterRequest,
  };
}
