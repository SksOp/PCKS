import React from "react";
import { Button, Typography, Box, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom"; // assuming you are using react-router for navigation
import { paths } from "src/router";
import SchoolIcon from "@mui/icons-material/School"; // Importing icons from Material UI
import AssessmentIcon from "@mui/icons-material/Assessment"; // Importing icons from Material UI

function AdminBoard() {
  const navigate = useNavigate();

  // Function to navigate to the Manage Students page
  const goToManageStudents = () => {
    navigate(paths.dashboard.student.root); // Update this with your actual route
  };

  // Function to navigate to the Result Dashboard page
  const goToResultDashboard = () => {
    navigate(paths.dashboard.result.root); // Update this with your actual route
  };

  return (
    <Container component="main">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          mt: 4,
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Welcome to the administration panel. Here you can oversee and manage
          critical aspects of the educational process.
        </Typography>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SchoolIcon />}
              onClick={goToManageStudents}
              sx={{ py: 2 }}
            >
              Manage Students
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AssessmentIcon />}
              onClick={goToResultDashboard}
              sx={{ py: 2 }}
            >
              Result Dashboard
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default AdminBoard;
