import React from "react";
import Layout from "src/components/layout";
import StudentDashBoard from "src/components/studentDashBoard";

function index() {
  return (
    <>
      <Layout>
        <StudentDashBoard />
      </Layout>
    </>
  );
}

export default index;
