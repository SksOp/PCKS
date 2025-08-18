import { Subject } from 'types';

const empthNurseryResult: Subject[] = [
  {
    subjectName: 'English',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Hindi',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Maths',
    results: { theory: null, fullMarks: 100, other: null },
  },
];
const empthLkgResult: Subject[] = [
  {
    subjectName: 'English',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Hindi',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Maths',
    results: { theory: null, fullMarks: 100, other: null },
  },
  // {
  //   subjectName: "G.K.",
  //   results: { theory: null, fullMarks: 100, other: null },
  // },
];

const empthUkgResult: Subject[] = [
  {
    subjectName: 'English',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Hindi',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Maths',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'G.K.',
    results: { theory: null, fullMarks: 100, other: null },
  },
];

const empthClassSeniorResult: Subject[] = [
  {
    subjectName: 'English',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Hindi',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Maths',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Science',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Social Science',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'GK',
    results: { theory: null, fullMarks: 100, other: null },
  },
  {
    subjectName: 'Computer',
    results: { theory: null, fullMarks: 100, other: null },
  },
];
export function createEmptyResultBasedOnClass(currentClass: string) {
  switch (currentClass) {
    case 'Nur.':
      return empthNurseryResult;
    case 'L.K.G':
      return empthLkgResult;
    case 'U.K.G':
      return empthUkgResult;
    default:
      return empthClassSeniorResult;
  }
}
