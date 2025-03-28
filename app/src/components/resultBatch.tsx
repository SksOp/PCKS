import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  TextField,
} from "@mui/material";
import { collection, doc } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { DB, RESULTS_COLLECTION, STUDENTS_COLLECTION } from "src/firebase";
import { CreateTermResultForStudent, Result, Student } from "types";
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
import { useState } from "react";
import { useFirebaseFunctions } from "src/hooks/server";
import { enqueueSnackbar } from "notistack";

interface Props {
  batch: string;
  term: string;
}

function studentInfo({ admissionNo }: { admissionNo: string }) {
  const studentRef = doc(DB, STUDENTS_COLLECTION, admissionNo);
  const [value, loading, error] = useDocument(studentRef);
  const studentData: Student | undefined = value?.data() as Student;
  if (loading) return <LinearProgress />;
  if (error) return <div>{error.message}</div>;
  if (!studentData) return <Typography variant="h3">No Data</Typography>;
  return studentData;
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
      <AddStudentToTheBatchDialog term={term} batch={batch} />
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
                    key={result.admissionNo}
                    admissionNo={result.admissionNo}
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
    const { currentClass: className } = curr;
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
  admissionNo,
  isCompleted,
}: {
  admissionNo: string;
  isCompleted: boolean;
}) => {
  const studentRef = doc(DB, STUDENTS_COLLECTION, admissionNo);
  const [value, loading, error] = useDocument(studentRef);
  const studentData: Student | undefined = value?.data() as Student;
  const param = useSearchParams();
  const navigate = useNavigate();
  if (loading) return <LinearProgress />;
  if (error) return <div>{error.message}</div>;
  if (!studentData) return <Typography variant="h3">No Data</Typography>;

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
        <Avatar>{studentData.name.charAt(0)}</Avatar>
        <Typography variant="subtitle1" component="div">
          {studentData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {studentData.admissionNo}
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
          onClick={() => handleEditClick(studentData.admissionNo)}
        >
          Edit
        </Button>
        {isCompleted && (
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleViewClick(studentData.admissionNo)}
          >
            View
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const AddStudentToTheBatchDialog = ({
  term,
  batch,
}: {
  term: string;
  batch: string;
}) => {
  const [open, setOpen] = useState(false);
  const [admissionNo, setAdmissionNo] = useState("");
  const { handleCreateTermResultForStudent } = useFirebaseFunctions();
  const handleAddStudent = async () => {
    const data: CreateTermResultForStudent = {
      admissionNo,
      term,
      batch,
    };
    const response = await handleCreateTermResultForStudent(data);
    if (response.success) {
      setOpen(false);
      enqueueSnackbar(response.message, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Student to the Batch</DialogTitle>
      <DialogContent>
        <TextField
          label="Admission No"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddStudent}>
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};
