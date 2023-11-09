import { getDoc } from "firebase/firestore";
import React from "react";
import {
  LinearProgress,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Container,
  Card,
  CircularProgress,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { resultSubCollection } from "src/firebase";
import { useBatch, useSemester } from "src/hooks/db";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useFirebaseFunctions } from "src/hooks/server";
import { useSearchParams } from "src/hooks/router";
import { paths } from "src/router";

function ResultDashBoard() {
  const { currentBatch, loading: batchLoading } = useBatch();
  const { exist, loading } = useSemester(String(currentBatch));
  const { enqueueSnackbar } = useSnackbar();
  const params = useSearchParams();
  const navigate = useNavigate();
  const { handleCreateTerm } = useFirebaseFunctions();
  const [proCessingHandleCreateTerm, setProcessingHandleCreateTerm] =
    React.useState(false);

  if (batchLoading) {
    return <LinearProgress />;
  }

  if (!currentBatch) {
    return (
      <Typography variant="h6">
        There was some error in getting the batch.
      </Typography>
    );
  }

  const handleDownload = () => {
    enqueueSnackbar(
      "Downloading result is not supported yet. Please contact your developer",
      {
        variant: "warning",
      }
    );
  };

  const handleShowResult = (term: string) => {
    params.set("term", term);
    params.set("batch", String(currentBatch));
    navigate(`${paths.dashboard.result.batch}?${params.toString()}`);
  };

  const createResult = async (term: string) => {
    setProcessingHandleCreateTerm(true);
    const response = await handleCreateTerm(term);
    if (response.success) {
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setProcessingHandleCreateTerm(false);
  };

  // Utility function to render buttons based on term result availability
  const renderTermResultActions = (
    termExists: boolean,
    term: string,
    isLoading: boolean
  ) => {
    if (isLoading) return <CircularProgress />;
    return termExists ? (
      <React.Fragment>
        <Button
          variant="outlined"
          onClick={() => handleShowResult(term)}
          startIcon={<VisibilityIcon />}
        >
          Show Result
        </Button>
        <Button
          variant="contained"
          onClick={handleDownload}
          startIcon={<GetAppIcon />}
        >
          Download
        </Button>
      </React.Fragment>
    ) : (
      <Button
        variant="contained"
        disabled={proCessingHandleCreateTerm}
        onClick={() => createResult(term)}
      >
        Create Result
      </Button>
    );
  };

  return (
    <Container component="main" maxWidth="md">
      {proCessingHandleCreateTerm && <LinearProgress />}
      <Card sx={{ mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Result Dashboard - Batch {currentBatch}
        </Typography>
        <Stack spacing={2}>
          {["First", "Second", "Annual"].map((term, index) => {
            const termExist = exist[`is${term}Term` as keyof typeof exist];
            const termLabel = term === "Annual" ? "Annual" : `${term} Term`;
            return (
              <Grid item xs={12} sm={6} md={4} key={term}>
                <Paper elevation={1} sx={{ padding: 2 }}>
                  <Typography variant="h6">{termLabel}</Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    {renderTermResultActions(termExist, term, loading)}
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Stack>
      </Card>
    </Container>
  );
}

export default ResultDashBoard;
