import { Student } from "../students";

export interface ResultMeta {
  term: string;
  year: string;
}

export interface SubjectResult {
  fullMarks: number;
  theory: number;
  other: number;
}

export interface Subject {
  subjectName: string;
  results: SubjectResult;
}

export interface Results {
  meta: ResultMeta;
  subjects: Subject[];
}

export interface Attendance {
  present: number;
  outOf: number;
}

export interface Result {
  student: Student;
  results: Results;
  attendance: Attendance;
}

export interface CreateTermRequest {
  term: string;
}

export interface CreateTermResponse {
  message: string;
  success: boolean;
}
