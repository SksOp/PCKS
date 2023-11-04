import AdmissionForm from "src/components/admissionForm";
import AdmissionNoForm from "src/components/admissionNoForm";
import { useSearchParams } from "src/hooks/router";

function index() {
  const params = useSearchParams();
  const admissionNo = params.get("admissionNo");

  if (admissionNo) {
    return <AdmissionForm />;
  }

  return <AdmissionNoForm />;
}

export default index;
