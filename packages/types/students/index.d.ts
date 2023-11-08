export interface Student {
  name: string; //e
  fatherName: string; //e
  motherName: string; //e
  admissionNo: string;
  admissionYear: number;
  admissionClass: string;
  currentClass: string; //e
  currentSection: string; //e
  currentRoll: number; //e
  isRegistered: boolean; //e
  phone: string;
  dob: string;
  address: string;
}

export interface HandleAdmissionRequest {
  name: string;
  fatherName: string;
  motherName: string;
  admissionYear: number;
  admissionClass: string;
  currentClass?: string;
  currentRoll?: number;
  phone: string | number;
  dob: string;
  address: string;
  admissionNo?: string;
}

export interface HandleAdmissionResponse {
  success: boolean;
  message: string;
  admissionNo?: string;
}

export interface HandleStudentUpdateRequest {
  name?: string;
  fatherName?: string;
  motherName?: string;
  currentClass?: string;
  currentSection?: string;
  currentRoll?: number;
  phone?: string;
  dob?: string;
  address?: string;
}

export interface HandleStudentUpdateResponse {
  success: boolean;
  message: string;
}

export interface GetAdmissionNoAvaibilityRequest {
  admissionNo: string;
}

export interface GetAdmissionNoAvaibilityResponse {
  success: boolean;
  message: string;
  isAvailable?: boolean;
}

export interface UnregisterStudentResponse {
  success: boolean;
  message: string;
}

export enum ClassLevels {
  NUR = "Nur.",
  LKG = "L.K.G",
  UKG = "U.K.G",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
}
