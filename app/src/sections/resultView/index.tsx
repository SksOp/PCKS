import { LinearProgress } from "@mui/material";
import { doc } from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import Layout from "src/components/layout";
import { ResultView } from "src/components/resultView";
import { dummyResultData } from "src/constants/dummyResult";
import { DB, RESULTS_COLLECTION } from "src/firebase";
import { useSearchParams } from "src/hooks/router";
import { Result } from "types";

function index() {
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
  return <ResultView data={dummyResultData} />;
}

export default index;
