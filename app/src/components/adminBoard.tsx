import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
  Stack,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/router";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import dayjs from "dayjs";
import { getCurrentBatch } from "src/utils/management";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useSnackbar } from "notistack";
import { useBatch } from "src/hooks/db";

function AdminBoard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { currentBatch, canChangeBatch, loading, error } = useBatch();
  const goToManageStudents = () => {
    navigate(paths.dashboard.student.root);
  };

  const goToResultDashboard = () => {
    navigate(paths.dashboard.result.root);
  };

  const changeBatch = () => {
    enqueueSnackbar(
      "Changing batch is not supported yet. Please contact your developer",
      {
        variant: "warning",
      }
    );
  };

  return (
    <Container component="main" maxWidth="md">
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography component="h1" variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Welcome to the administration panel. Here you can oversee and manage
            critical aspects of the educational process.
          </Typography>

          {loading && (
            <Skeleton variant="rectangular" width="100%" height={118} />
          )}

          {!loading && error && (
            <Typography variant="body1" gutterBottom>
              Error loading batch information
            </Typography>
          )}

          {currentBatch && (
            <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
              <BatchStatusIndicator batch={currentBatch} />
            </Box>
          )}

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
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
                variant="contained"
                fullWidth
                startIcon={<AssessmentIcon />}
                onClick={goToResultDashboard}
                sx={{ py: 2 }}
              >
                Result Dashboard
              </Button>
            </Grid>
          </Grid>
          {canChangeBatch && (
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              color="primary"
              onClick={changeBatch}
            >
              Change Batch
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminBoard;

const BatchStatusIndicator = ({ batch }: { batch: string }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <FiberManualRecordIcon sx={{ color: "success.main" }} />
      <Typography variant="h6" component="p">
        Current Batch: <strong>{batch}</strong>
      </Typography>
    </Stack>
  );
};
