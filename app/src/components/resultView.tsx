import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Container,
  Grid,
  styled,
  LinearProgress,
} from "@mui/material";
import { Result, Subject } from "types";
import { calculateGrade } from "src/utils/result";

const TableCell = styled(MuiTableCell)({
  padding: "6px",
  border: "1px solid #ccc",
});

export function ResultView({ data }: { data: Result }) {
  const StudentData = () => {
    const studentData = data.student;

    return (
      <Box
        sx={{
          backgroundColor: "slate.100",
          p: 2,
          textTransform: "uppercase",
        }}
      >
        <Grid
          sx={{
            "& .MuiGrid-item": {
              p: "1px",
            },
          }}
          container
          spacing={1}
        >
          <Grid item xs={12}>
            <MetaDataHolder label="Name" value={studentData.name} />
          </Grid>
          <Grid item xs={12}>
            <MetaDataHolder
              label="Father's Name"
              value={studentData.fatherName}
            />
          </Grid>
          <Grid item xs={12}>
            <MetaDataHolder
              label="Mother's Name"
              value={studentData.motherName}
            />
          </Grid>
          <Grid item xs={4}>
            <MetaDataHolder label="Class" value={studentData.currentClass} />
          </Grid>
          <Grid item xs={4}>
            <MetaDataHolder
              label="Roll No."
              value={String(studentData.currentRoll)}
            />
          </Grid>
          <Grid item xs={4}>
            <MetaDataHolder label="Ad. No" value={studentData.admissionNo} />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <Container maxWidth="md" sx={{ p: "10px" }}>
        <Header data={data} />
        <StudentData />
        <StudentResultTable subjects={data.results.subjects} />
        <AttendanceComponent attendanceData={data.attendance} />
        <GradeInformation />
        <SignatureComponent />
      </Container>
      <Box
        sx={{
          width: "calc(100% - 10px)",
          height: "calc(100% - 10px)",
          position: "fixed",
          top: "5px",
          left: "5px",
          border: "2px solid #aeaeae",
          zIndex: 1000,
        }}
      />
    </>
  );
}

function Logo() {
  return <img src="/logo512.png" alt="logo" style={{ maxWidth: 100 }} />;
}

function Header({ data }: { data: Result }) {
  return (
    <Box
      sx={{
        width: "95%",
        mx: "auto",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
      }}
    >
      <Logo />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Prem Chandra Kids School
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
          Rajopatti, Dumra Road, Sitamarhi
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
        >
          Result of {capitaliseFirstLetter(data.results.meta.term)}-term{" "}
          {data.results.meta.year} Examination
        </Typography>
      </Box>
      <Logo />
    </Box>
  );
}

function capitaliseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const MetaDataHolder = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => (
  <Grid container spacing={1}>
    <Grid item xs={4}>
      <Typography
        variant="body1"
        component="span"
        fontWeight="bold"
        fontSize="0.9rem"
      >
        {label}:
      </Typography>
    </Grid>
    <Grid item xs={4}>
      <Typography fontSize="0.9rem" variant="body1" component="span">
        {value}
      </Typography>
    </Grid>
  </Grid>
);

interface StudentResultTableProps {
  subjects: Subject[];
}
const StudentResultTable = ({ subjects }: StudentResultTableProps) => {
  const totalMarks = subjects.reduce(
    (acc, subject) =>
      acc + Number(subject.results.theory) + Number(subject.results.other),
    0
  );
  const totalFullMarks = subjects.reduce(
    (acc, subject) => acc + subject.results.fullMarks,
    0
  );
  const overallPercentage = (totalMarks / totalFullMarks) * 100;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="center" colSpan={2}>
                Obtained Marks
              </TableCell>
              <TableCell align="center">Full Marks</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Grade</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell align="center">Theory</TableCell>
              <TableCell align="center">Other</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => {
              const totalSubjectMarks =
                Number(subject.results.theory) + Number(subject.results.other);
              return (
                <TableRow key={subject.subjectName}>
                  <TableCell component="th" scope="row">
                    {subject.subjectName}
                  </TableCell>
                  <TableCell align="center">{subject.results.theory}</TableCell>
                  <TableCell align="center">{subject.results.other}</TableCell>
                  <TableCell align="center">
                    {subject.results.fullMarks}
                  </TableCell>
                  <TableCell align="center">{totalSubjectMarks}</TableCell>
                  <TableCell align="center">
                    {calculateGrade(totalSubjectMarks)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={4} align="right">
                Overall Marks
              </TableCell>
              <TableCell align="center">{totalMarks}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} align="right">
                Overall Percentage
              </TableCell>
              <TableCell align="center">
                {overallPercentage.toFixed(2)}%
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

function GradeInformation() {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table aria-label="grades table">
        <TableHead>
          <TableRow>
            <TableCell>Grade</TableCell>
            <TableCell align="center">A1</TableCell>
            <TableCell align="center">A2</TableCell>
            <TableCell align="center">B1</TableCell>
            <TableCell align="center">B2</TableCell>
            <TableCell align="center">C1</TableCell>
            <TableCell align="center">C2</TableCell>
            <TableCell align="center">D</TableCell>
            <TableCell align="center">E</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Minimum Score</TableCell>
            <TableCell align="center">91</TableCell>
            <TableCell align="center">81</TableCell>
            <TableCell align="center">71</TableCell>
            <TableCell align="center">61</TableCell>
            <TableCell align="center">51</TableCell>
            <TableCell align="center">41</TableCell>
            <TableCell align="center">33</TableCell>
            <TableCell align="center">Below 33</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell>Discipline</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Needs Improvement</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface AttendanceComponentProps {
  attendanceData: {
    present: number;
    outOf: number;
  };
}
const AttendanceComponent = ({ attendanceData }: AttendanceComponentProps) => {
  const attendancePercentage =
    (attendanceData.present / attendanceData.outOf) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingTop: "10px",
        paddingBottom: "10px",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div style={{ flex: 3 }}>
        <div>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="grades table">
              <TableHead>
                <TableRow>
                  <TableCell>CO-SCHOLASTIC AREAS</TableCell>
                  <TableCell>
                    1<sup>st</sup> Term Exam
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Work Education</TableCell>
                  <TableCell>A1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Art Education</TableCell>
                  <TableCell>A1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Health & Physical Education</TableCell>
                  <TableCell>A1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Discipline</TableCell>
                  <TableCell>A1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          paddingLeft: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <div>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: "8px" }}>
            Attendance:
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "8px" }}
            style={{ marginBottom: "8px" }}
          >
            {attendanceData.present} / {attendanceData.outOf}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const SignatureComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box sx={{ flex: 1, mt: 10, width: "100%" }}>
        <Typography textAlign="center" width="100%" variant="body1">
          CLASS TEACHER SIGN
        </Typography>
      </Box>
      <Box sx={{ flex: 1, mt: 10, width: "100%" }}>
        <Typography textAlign="center" width="100%" variant="body1">
          PARENTS SIGN
        </Typography>
      </Box>
      <Box sx={{ flex: 1, mt: 10, width: "100%" }}>
        <Typography textAlign="center" width="100%" variant="body1">
          PRINCIPAL SIGN
        </Typography>
      </Box>
    </div>
  );
};
