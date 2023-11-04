import React from "react";
import Router from "./router";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </>
  );
}

export default App;
