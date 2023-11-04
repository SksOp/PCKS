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
}

export interface HandleAdmissionRequest extends Student {}

export interface HandleAdmissionResponse {
  success: boolean;
  message: string;
}

export interface HandleRollChangeRequest {
  updatedRoll: number;
  admissionNo: string;
}

export interface HandleRollChangeResponse {
  success: boolean;
  message: string;
}

export interface HandleClassChangeRequest {
  updatedClass: string;
  admissionNo: string;
}

export interface HandleClassChangeResponse {
  success: boolean;
  message: string;
}

export interface HandleSectionChangeRequest {
  updatedSection: string;
  admissionNo: string;
}

export interface HandleSectionChangeResponse {
  success: boolean;
  message: string;
}

export interface HandleNameChangeRequest {
  updatedName: string;
  admissionNo: string;
}

export interface HandleNameChangeResponse {
  success: boolean;
  message: string;
}
