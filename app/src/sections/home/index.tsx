import { LinearProgress } from "@mui/material";
import React from "react";
import AdminBoard from "src/components/adminBoard";
import Layout from "src/components/layout";
import LoginBoard from "src/components/loginBoard";
import { useAuthContext } from "src/hooks/auth";

function index() {
  const context = useAuthContext();
  console.log(context);
  return (
    <>
      <Layout>
        {context.loading && <LinearProgress />}
        {context.user && <AdminBoard />}
        {!context.user && <LoginBoard />}
      </Layout>
    </>
  );
}

export default index;
