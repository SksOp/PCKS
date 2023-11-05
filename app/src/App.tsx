import React from "react";
import Router from "./router";
import { SnackbarProvider } from "notistack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
