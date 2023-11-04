export interface Student {
  name: string;
  fatherName: string;
  motherName: string;
  admissionNo: string;
  admissionYear: number;
  admissionClass: string;
  currentClass: string;
  currentSection: string;
  currentRoll: number;
  isRegistered: boolean;
}

export interface HandleAdmissionRequest {
  name: string;
  fatherName: string;
  motherName: string;
  admissionYear: number;
  admissionClass: string;
  currentClass: string;
  currentSection: string;
  currentRoll: number;
  isRegistered: boolean;
}

export interface HandleAdmissionResponse {
  success: boolean;
  message: string;
}

export interface HandleStudentUpdateRequest {
  name?: string;
  fatherName?: string;
  motherName?: string;
  currentClass?: string;
  currentSection?: string;
  currentRoll?: number;
  isRegistered?: boolean;
}

export interface HandleStudentUpdateResponse {
  success: boolean;
  message: string;
}
