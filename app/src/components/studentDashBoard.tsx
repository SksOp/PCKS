import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { paths } from "src/router";

function StudentDashBoard() {
  const [open, setOpen] = useState(false);
  const [admissionNo, setAdmissionNo] = useState("");
  const navigate = useNavigate();

  const addStudentPath = paths.dashboard.student.add;
  const viewStudentPath = "/dashboard/student/profile"; // Base path for student profile

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStudent = () => {
    navigate(addStudentPath);
  };

  const handleViewProfile = () => {
    if (admissionNo) {
      navigate(`${viewStudentPath}/${admissionNo}`);
    }
  };

  const handleShowAllStudents = () => {
    navigate(paths.dashboard.student.all);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      m={4}
    >
      <Card variant="outlined" sx={{ width: "100%", maxWidth: 325 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Student Management
          </Typography>
          <Typography variant="h5" component="div">
            Add a New Student
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Enroll a new student into the system.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </CardActions>
      </Card>

      <Card variant="outlined" sx={{ width: "100%", maxWidth: 325 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Student Information
          </Typography>
          <Typography variant="h5" component="div">
            View Student Profile
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Look up details for an existing student.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<SearchIcon />} onClick={handleOpen}>
            View Profile
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Student Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To view a student profile, please enter the admission number.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="admissionNo"
            label="Admission Number"
            type="text"
            fullWidth
            variant="standard"
            value={admissionNo}
            onChange={(e) => setAdmissionNo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleViewProfile();
                handleClose();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleViewProfile}>View</Button>
        </DialogActions>
      </Dialog>
      <Card variant="outlined" sx={{ width: "100%", maxWidth: 325 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            All Student
          </Typography>
          <Typography variant="h5" component="div">
            List All Students
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Look up details for an existing student.
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={<SchoolIcon />}
            onClick={handleShowAllStudents}
          >
            View All Students
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default StudentDashBoard;
