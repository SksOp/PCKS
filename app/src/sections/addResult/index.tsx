import React from "react";

import Layout from "src/components/layout";
import ResultEditor from "src/components/resultEditor";
import { useSearchParams } from "src/hooks/router";

function Index() {
  const params = useSearchParams();
  const term = params.get("term");
  const batch = params.get("batch");
  const admissionNo = params.get("admissionNo");
  return <Layout>{/* <ResultEditor /> */}</Layout>;
}

export default Index;
