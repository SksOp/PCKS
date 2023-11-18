export function calculateGrade(marks: number) {
  if (marks >= 91) return "A1";
  if (marks >= 81) return "A2";
  if (marks >= 71) return "B1";
  if (marks >= 61) return "B2";
  if (marks >= 51) return "C1";
  if (marks >= 41) return "C2";
  if (marks >= 33) return "D";
  return "E";
}
