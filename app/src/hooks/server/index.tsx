import axios from "axios";
import {
  GetAdmissionNoAvaibilityResponse,
  HandleAdmissionRequest,
  HandleAdmissionResponse,
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
    const URL = `${API}/v1/student/admission/${admissionNo}`;
    const response = await axios.post(URL, { data: input });
    const data: HandleAdmissionResponse = response.data;
    return data;
  };

  return { getAdmissionNoAvaibility, handleAdmissionRequest };
}
