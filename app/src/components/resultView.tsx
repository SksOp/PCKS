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
  border: '1px solid #ccc',
});

export function ResultView({ data }: { data: Result }) {
  const StudentData = () => {
    const studentData = data.student;

    return (
      <Box
        sx={{
          backgroundColor: "slate.100",
            // border: 1,
            // borderColor: "black",
          p: 2,
          textTransform: "uppercase",
        }}
      >
        <MetaDataHolder label="Name" value={studentData.name} />
        <MetaDataHolder label="Class" value={studentData.currentClass} />
        <MetaDataHolder
          label="Roll Number"
          value={String(studentData.currentRoll)}
        />
        <MetaDataHolder label="Admission No" value={studentData.admissionNo} />
        <MetaDataHolder label="Father's Name" value={studentData.fatherName} />
        <MetaDataHolder label="Mother's Name" value={studentData.motherName} />
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ p: "10px" }}>
      <Header data={data} />
      <StudentData />
      <StudentResultTable subjects={data.results.subjects} />
      <AttendanceComponent attendanceData={data.attendance} />
      <GradeInformation />
      <SignatureComponent />
    </Container>
  );
}

function Logo() {
  return <img src="/logo512.png" alt="logo" style={{ maxWidth: 130 }} />;
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
        <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "2rem" }}>
          Prem Chandra Kids School
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Result of {data.results.meta.term}-term {data.results.meta.year}{" "}
          Examination
        </Typography>
      </Box>
      <Logo />
    </Box>
  );
}

const MetaDataHolder = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => (
  <Grid container spacing={1}>
    <Grid item xs={3}>
      <Typography variant="body1" component="span" fontWeight="bold">
        {label}:
      </Typography>
    </Grid>
    <Grid item xs={9}>
      <Typography variant="body1" component="span">
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
          <TableRow>
            <TableCell>Discipline</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Needs Improvement</TableCell>
          </TableRow>
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
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingTop: '25px', paddingBottom: '25px' }}>
      <div style={{ flex: 3, paddingRight: '10px' }}>
        <div>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="grades table">
              <TableHead>
                <TableRow>
                  <TableCell>CO-SCHOLASTIC AREAS</TableCell>
                  <TableCell>1<sup>st</sup> Term Exam</TableCell>
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
      <div style={{ flex: 1, paddingLeft: '10px',  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #ccc', padding: '10px'}}>
        <div>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: '8px' }}>
            Attendance:
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }} style={{ marginBottom: '8px' }}>
            {attendanceData.present} / {attendanceData.outOf}
          </Typography>
          
        </div>
      </div>
    </div>

  );
};

const SignatureComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <div style={{ flex: 1, padding: '100px', width: '100%' }}>
        <Typography variant="body1">
        CLASS TEACHER SIGN
        </Typography>
      </div>
      <div style={{ flex: 1, padding: '100px', width: '100%' }}>
        <Typography variant="body1">
        PARENTS SIGN
        </Typography>
      </div>
      <div style={{ flex: 1, padding: '100px', width: '100%' }}>
        <Typography variant="body2">
        PRINCIPAL SIGN
        </Typography>
      </div>
    </div>
  );
};