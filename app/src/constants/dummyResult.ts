import { Result } from "types";
export const dummyResultData: Result = {
  student: {
    name: "John Doe",
    currentRoll: 1,
    currentClass: "1",
    currentSection: "A",
    admissionNo: "123",
    fatherName: "John Doe",
    motherName: "Jane Doe",
    dob: "01/01/2000",
    isRegistered: true,
    phone: "1234567890",
    admissionClass: "1",
    admissionYear: 2020,
    address: "123, Lorem Ipsum, Dolor Sit Amet",
  },
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
