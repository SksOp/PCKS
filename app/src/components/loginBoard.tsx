import React from "react";
import { useAuthContext } from "src/hooks/auth";
import { Button, Paper, Typography, Box, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import SchoolIcon from "@mui/icons-material/School";

function LoginBoard() {
  const { loginWithGoogle } = useAuthContext();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* School Logo */}
        <img src="/logo512.png" alt="School Logo" width="300" />

        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Welcome to <br /> Prem Chandra Kids School
        </Typography>

        {/* Google Login Button */}
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={loginWithGoogle}
          sx={{ mt: 3, mb: 2 }}
        >
          Login with Google
        </Button>

        {/* About Section */}
        <Paper
          elevation={3}
          sx={{ padding: 2, marginTop: 3, textAlign: "center" }}
        >
          <Typography variant="body1" color="textSecondary">
            This is school admin portal to manage the school data. Only
            authorized person can access this portal.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginBoard;
