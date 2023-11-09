import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  CreateResultRequest,
  CreateResultResponse,
  Result,
  Student,
  Subject,
} from "types";
import { useFirebaseFunctions } from "src/hooks/server";
import { useSnackbar } from "notistack";

interface FormValues {
  subjects: Subject[];
  attendance: {
    present: number;
    outOf: number;
  };
}

function ResultEditor({ resultDoc }: { resultDoc: Result }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      subjects: resultDoc.results.subjects,
      attendance: resultDoc.attendance,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "subjects",
  });
  const { enqueueSnackbar } = useSnackbar();
  const { handleCreateResult } = useFirebaseFunctions();
  const onSubmit = async (input: FormValues) => {
    const data: CreateResultRequest = {
      subjects: input.subjects,
      admissionNo: resultDoc.student.admissionNo,
      attendance: input.attendance,
      batch: resultDoc.results.meta.year,
      term: resultDoc.results.meta.term,
    };
    const response: CreateResultResponse = await handleCreateResult(data);
    if (!response.success) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    enqueueSnackbar(response.message, { variant: "success" });
  };

  // console.log(resultDoc);

  return (
    <Container maxWidth="sm">
      <Card variant="outlined" sx={{ mb: 2, maxWidth: "md" }}>
        <CardContent>
          <GeneralDetails student={resultDoc.student} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
              {resultDoc.results.meta.term.toUpperCase()} {"TERM, "}
              {resultDoc.results.meta.year}
            </Typography>

            {fields.map((item, index) => (
              <div key={item.id}>
                <Typography variant="subtitle1">{item.subjectName}</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Theory Marks"
                  variant="outlined"
                  {...register(`subjects.${index}.results.theory`)}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Other Marks"
                  variant="outlined"
                  {...register(`subjects.${index}.results.other`)}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            ))}

            <TextField
              fullWidth
              margin="normal"
              label="Present Days"
              variant="outlined"
              {...register(`attendance.present`)}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Total Days"
              variant="outlined"
              {...register(`attendance.outOf`)}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit Results
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ResultEditor;

function GeneralDetails({ student }: { student: Student }) {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3, border: "1px solid #e0e0e0" }}>
      <Table aria-label="student details">
        <TableBody>
          <TableRow>
            <TableCell variant="head">Student Profile</TableCell>
            <TableCell>
              <Typography fontWeight={600}>{student.name}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Admission Number</TableCell>
            <TableCell>{student.admissionNo}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Class </TableCell>
            <TableCell>{student.currentClass}</TableCell>
          </TableRow>
          {student.currentRoll && (
            <TableRow>
              <TableCell>Roll </TableCell>
              <TableCell>{student.currentRoll}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
