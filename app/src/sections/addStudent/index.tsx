import AdmissionForm from "src/components/admissionForm";
import AdmissionNoForm from "src/components/admissionNoForm";
import Layout from "src/components/layout";
import { useSearchParams } from "src/hooks/router";

function index() {
  return (
    <Layout>
      <AdmissionForm />
    </Layout>
  );
}

export default index;
