import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  LinearProgress,
} from "@mui/material";
import { collection, query } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { DB, RESULTS_COLLECTION } from "src/firebase";
import { Result, Student } from "types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSearchParams } from "src/hooks/router";
import { useNavigate } from "react-router-dom";
import { paths } from "src/router";

interface Props {
  batch: string;
  term: string;
}
function ResultBatch({ batch, term }: Props) {
  const collectionPath = `${RESULTS_COLLECTION}/${batch}/${term.toLowerCase()}`;
  const collectionRef = collection(DB, collectionPath);
  const [value, loading, error] = useCollection(collectionRef);
  if (loading) return <LinearProgress />;
  if (error) return <div>{error.message}</div>;

  const results: Result[] = value?.docs.map((doc) => doc.data()) as Result[];
  const grouped = groupByClass(results);

  return (
    <Box sx={{ margin: 4 }}>
      {Object.entries(grouped).map(([classKey, results]) => (
        <Box key={classKey} sx={{ marginBottom: 4 }}>
          <Accordion key={classKey}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Class {classKey}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {results.map((result) => (
                  <RenderStudentCard
                    key={result.student.admissionNo}
                    student={result.student}
                    isCompleted={Boolean(result.isCompleted)}
                  />
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </Box>
  );
}

export default ResultBatch;

function groupByClass(results: Result[]) {
  const grouped = results.reduce((acc, curr) => {
    const { currentClass: className } = curr.student;
    if (acc[className]) {
      acc[className].push(curr);
    } else {
      acc[className] = [curr];
    }
    return acc;
  }, {} as { [key: string]: Result[] });
  return grouped;
}

const RenderStudentCard = ({
  student,
  isCompleted,
}: {
  student: Student;
  isCompleted: boolean;
}) => {
  const param = useSearchParams();
  const navigate = useNavigate();
  const handleEditClick = (admissionNo: string) => {
    param.set("admissionNo", admissionNo);
    navigate(`${paths.dashboard.result.add}?${param.toString()}`);
  };

  const handleViewClick = (admissionNo: string) => {
    param.set("admissionNo", admissionNo);
    navigate(`${paths.dashboard.result.view}?${param.toString()}`);
  };
  return (
    <Card sx={{ display: "inline-block", width: 250, margin: 2, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          mb: 2,
        }}
      >
        <Avatar>{student.name.charAt(0)}</Avatar>
        <Typography variant="subtitle1" component="div">
          {student.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {student.admissionNo}
        </Typography>
        <Chip
          label={isCompleted ? "Completed" : "Not Completed"}
          color={isCompleted ? "success" : "error"}
          size="small"
        />
      </Box>

      <CardActions>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<EditIcon />}
          onClick={() => handleEditClick(student.admissionNo)}
        >
          Edit
        </Button>
        {isCompleted && (
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleViewClick(student.admissionNo)}
          >
            View
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
