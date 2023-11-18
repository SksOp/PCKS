import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { Result } from "types";

export function ResultView({ data }: { data: Result }) {
  const StudentData = () => {
    const studentData = data.student;

    return (
      <Box
        sx={{
          backgroundColor: "slate.100",
          //   border: 1,
          //   borderColor: "black",
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
    <Container maxWidth="md">
      <Header data={data} />

      <StudentData />

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
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell align="center">Theory</TableCell>
              <TableCell align="center">Other</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.subjects.map((subject) => (
              <TableRow key={subject.subjectName}>
                <TableCell component="th" scope="row">
                  {subject.subjectName}
                </TableCell>
                <TableCell align="center">{subject.results.theory}</TableCell>
                <TableCell align="center">{subject.results.other}</TableCell>
                <TableCell align="center">
                  {subject.results.fullMarks}
                </TableCell>
                <TableCell align="center">
                  {subject.results.theory &&
                    subject.results.other &&
                    Number(subject.results.theory) +
                      Number(subject.results.other)}
                  {!(subject.results.theory && subject.results.other) && (
                    <>N/A</>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom>
        Attendance
      </Typography>
      <p>
        Present: {data.attendance.present} / {data.attendance.outOf}
      </p>
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
