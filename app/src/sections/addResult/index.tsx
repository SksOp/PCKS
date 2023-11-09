import { LinearProgress } from "@mui/material";
import { doc } from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

import Layout from "src/components/layout";
import ResultEditor from "src/components/resultEditor";
import { DB, RESULTS_COLLECTION } from "src/firebase";
import { useSearchParams } from "src/hooks/router";
import { Result } from "types";

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

  const docRef = doc(DB, path);
  const [value, loading, error] = useDocument(docRef);
  if (loading) return <LinearProgress />;
  if (error) return <div>{error.message}</div>;

  const data = value?.data() as Result;
  if (!data) {
    return (
      <Layout>
        <div>Result not found</div>
      </Layout>
    );
  }
  console.log(data);
  return (
    <Layout>
      {" "}
      <ResultEditor resultDoc={data} />
    </Layout>
  );
}

export default Index;
