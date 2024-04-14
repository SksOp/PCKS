import { Result } from "types";
export const dummyResultData: Result = {
 
    currentClass: "1",
    currentSection: "A",
    admissionNo: "123",
    currentRoll: 1,
  results: {
    meta: {
      term: "First",
      year: "2023-2024",
    },
    subjects: [
      {
        subjectName: "English",
        results: { theory: 50, fullMarks: 5, other: 5 },
      },
      {
        subjectName: "Hindi",
        results: { theory: 50, fullMarks: 5, other: 5 },
      },
      {
        subjectName: "Social Science",
        results: { theory: 50, fullMarks: 5, other: 5 },
      },
      {
        subjectName: "Science",
        results: { theory: 50, fullMarks: 5, other: 5 },
      },
      {
        subjectName: "Maths",
        results: { theory: 50, fullMarks: 5, other: 5 },
      },
      {
        subjectName: "G.K.",
        results: { theory: 50, fullMarks: 5, other: 5 },
      },
      {
        subjectName: "Computer",
        results: { theory: 50, fullMarks: 5, other: 5 },
      },
    ],
  },
  attendance: {
    present: 90,
    outOf: 100,
  },
};
