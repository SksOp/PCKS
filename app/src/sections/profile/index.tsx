import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  CircularProgress,
  Container,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { DB, STUDENTS_COLLECTION } from "src/firebase";
import { Student } from "types";
import StudentProfile from "src/components/studentProfile";
import Layout from "src/components/layout";

function Profile() {
  const { admissionNo } = useParams<{ admissionNo: string }>();
  if (!admissionNo) return null;

  const studentRef = doc(DB, STUDENTS_COLLECTION, admissionNo);
  const [value, loading, error] = useDocument(studentRef);

  const studentData: Student | undefined = value?.data() as Student;

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h3">Error</Typography>;
  if (!studentData) return <Typography variant="h3">No Data</Typography>;
  return (
    <Layout>
      <Container maxWidth="sm">
        <StudentProfile student={studentData} />
      </Container>
    </Layout>
  );
}

export default Profile;
