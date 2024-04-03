import React from 'react';
import { useNavigate } from 'react-router-dom';
import { query, where } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { studentsCollection } from 'src/firebase';
import { paths } from 'src/router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PanoramaFishEye, SupervisedUserCircle } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Student } from 'types';

// Student viewing card component
function StudentCard({ student }:{student:Student}) {
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ mb: 2,width:"250px" }}>
      <CardContent>
        <Typography variant="h5" component="div">{student.name}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Class: {student.currentClass} - {student.currentSection}<br/> Roll: {student.currentRoll}
        </Typography>
        <Typography variant="body2">F: {student.fatherName}</Typography>
        <Typography variant="body2">M: {student.motherName}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<PanoramaFishEye />}
          onClick={() => navigate(paths.dashboard.student.profile.replace(":admissionNo", student.admissionNo))}
        >
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
}
type ClassGroups = {
  [className:string]:Student[]
}
function AllStudents() {
  const q = query(studentsCollection, where("isRegistered", "==", true));
  const [docs, loading, error] = useCollectionDataOnce(q);
  if (loading) return <LinearProgress/>;
  if (error) return <div>Error Getting the doc from the firebase</div>
  if (!docs) return <div>No students found</div>;

  // Process docs into groups
  const students = docs.map((d) => d as Student);
  const classGroups = students.reduce<ClassGroups>((groups, student) => {
    const { currentClass } = student;
    if (!groups[currentClass]) {
      groups[currentClass] = [];
    }
    groups[currentClass].push(student);
    return groups;
  }, {});

  return (
    <Container maxWidth="md" sx={{ p: 1 }}>
      <Typography sx={{ fontSize: 24, m: 1, my: 2 }} color="text.secondary" gutterBottom>
        All Student
      </Typography>
      {Object.entries(classGroups).map(([classGroup, students]) => (
        <Accordion key={classGroup}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{`Class ${classGroup}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Stack direction="row"  sx={{flexWrap:"wrap",gap:1}}>
              {students.map(student => (

                <StudentCard key={student.admissionNo} student={student} />
              ))}
            </Stack> 
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default AllStudents;

