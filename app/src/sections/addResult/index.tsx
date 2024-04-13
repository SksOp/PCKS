import { LinearProgress } from "@mui/material";
import { doc } from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

import Layout from "src/components/layout";
import ResultEditor from "src/components/resultEditor";
import { DB, RESULTS_COLLECTION, STUDENTS_COLLECTION } from "src/firebase";
import { useSearchParams } from "src/hooks/router";
import { Result, Student } from "types";

function Index() {
  const params = useSearchParams();
  const term = params.get("term");
  const batch = params.get("batch");
  const admissionNo = params.get("admissionNo");
  const navigate = useNavigate();
  if (!term || !batch || !admissionNo) {
    navigate("/");
    return null;
  }

  const path = `${RESULTS_COLLECTION}/${batch}/${term.toLowerCase()}/${admissionNo}`;
  const studentRef = doc(DB, STUDENTS_COLLECTION, admissionNo);
  const docRef = doc(DB, path);
  
  const [studentValue, studentLoading, studentError] = useDocument(studentRef);
  const [resultValue, resultLoading, resultError] = useDocument(docRef);
  if (resultLoading || studentLoading) return <LinearProgress />;
  if (resultError || studentError) return <div>{resultError?.message ?? studentError?.message}</div>;
  const resultData = resultValue?.data() as Result;
  const studentData: Student | undefined = studentValue?.data() as Student;

  if (!resultData) {
    return (
      <Layout>
        <div>Result not found</div>
      </Layout>
    );
  }
  if (!studentData) {
    return (
      <Layout>  
        <div>Student not found</div>
      </Layout>
    );
  }
  return (
    <Layout>
      {" "}
      <ResultEditor resultDoc={resultData} studentData={studentData} />
    </Layout>
  );
}

export default Index;
