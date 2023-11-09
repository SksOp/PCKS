import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "src/components/layout";
import ResultBatch from "src/components/resultBatch";
import { useSearchParams } from "src/hooks/router";
import { paths } from "src/router";

function index() {
  const { batch } = useParams<{ batch: string }>();
  const params = useSearchParams();
  const term = params.get("term");
  const navigate = useNavigate();
  if (!batch || !term) {
    return null;
  }
  return (
    <Layout>
      <ResultBatch term={term} batch={batch} />
    </Layout>
  );
}

export default index;
