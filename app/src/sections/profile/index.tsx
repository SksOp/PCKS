import { doc } from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { DB, STUDENTS_COLLECTION } from "src/firebase";
import { Student } from "types";
function Profile() {
  const { admissionNo } = useParams();
  if (!admissionNo) return null;
  const studentref = doc(DB, STUDENTS_COLLECTION, admissionNo);
  const [value, loading, error] = useDocument(studentref);
  const studentData: Student | undefined = value?.data() as Student;

  return (
    <p>
      {studentData?.name} {studentData?.admissionNo}
    </p>
  );
}

export default Profile;
