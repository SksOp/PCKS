import { Student } from "../students";

export interface ResultMeta {
  term: string;
  year: string;
}

export interface SubjectResult {
  fullMarks: number;
  theory: number | null;
  other: number | null;
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
  admissionNo: string;
  currentClass: string;
  currentSection: string;
  currentRoll: number;
  results: Results;
  attendance: Attendance;
  isCompleted?: boolean;
}

export interface CreateTermRequest {
  term: string;
}

export interface CreateTermResponse {
  message: string;
  success: boolean;
}

export interface CreateTermResultForStudent {
  admissionNo: string;
  term: string;
  batch: string;
}

export interface CreateTermResultForStudentResponse {
  message: string;
  success: boolean;
}

export interface CreateResultRequest {
  subjects: Subject[];
  term: string;
  batch: string;
  admissionNo: string;
  attendance: Attendance;
}

export interface CreateResultResponse {
  message: string;
  success: boolean;
}

export interface GetRankingResponse {
  message: string;
  success: boolean;
  data: Ranking[];
}

export interface Ranking {
  name: string;
  roll: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: string;
  rank: number;
}
