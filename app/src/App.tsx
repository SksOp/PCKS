import React from "react";
import Router from "./router";
import { SnackbarProvider } from "notistack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "./auth/context/auth-provider";
import { AuthConsumer } from "./auth/context/auth-consumer";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <AuthConsumer>
          <Router />
        </AuthConsumer>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
