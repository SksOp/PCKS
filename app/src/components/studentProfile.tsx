import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFirebaseFunctions } from "src/hooks/server";
import { HandleStudentUpdateRequest, Student } from "types";
import {
  Button,
  Container,
  Stack,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormLabel,
  Card,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorSpan({ children }: { children: string }) {
  return (
    <Typography variant="caption" color="error" display="block" mt={-2} mb={2}>
      <ErrorOutlineIcon
        fontSize="small"
        sx={{ position: "relative", top: "5px", mr: 1 }}
      />
      {children}
    </Typography>
  );
}

function StudentProfile({ student }: { student: Student }) {
  const [isEdit, setIsEdit] = React.useState(false);
  const { handleStudentUpdateRequest } = useFirebaseFunctions();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<HandleStudentUpdateRequest>({
    defaultValues: {
      name: student.name,
      fatherName: student.fatherName,
      motherName: student.motherName,
      currentClass: student.currentClass,
      currentSection: student.currentSection,
      currentRoll: student.currentRoll,
      phone: student.phone,
      dob: student.dob,
      address: student.address,
    },
  });

  const onSubmit = async (TextField: HandleStudentUpdateRequest) => {
    const data = await handleStudentUpdateRequest(
      student.admissionNo,
      TextField
    );
    if (!data.success) {
      enqueueSnackbar(data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(data.message, { variant: "success" });
    setIsEdit(false);
  };

  return (
    <Container maxWidth="sm">
      <Card raised sx={{ p: 3, mt: 5 }}>
        <GeneralDetails student={student} />

        <Stack
          mt={2}
          component="form"
          gap={2}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormLabel> Name</FormLabel>
          <TextField
            disabled={!isEdit}
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <ErrorSpan>This field is required</ErrorSpan>}

          <FormLabel> Father Name</FormLabel>
          <TextField
            disabled={!isEdit}
            type="text"
            {...register("fatherName", { required: true })}
          />
          {errors.fatherName && <ErrorSpan>This field is required</ErrorSpan>}
          <FormLabel> Mother Name</FormLabel>
          <TextField
            disabled={!isEdit}
            type="text"
            {...register("motherName", { required: true })}
          />
          {errors.motherName && <ErrorSpan>This field is required</ErrorSpan>}
          <FormLabel> Phone</FormLabel>
          <TextField
            disabled={!isEdit}
            type="number"
            {...register("phone", { required: true })}
          />
          {errors.phone && <ErrorSpan>This field is required</ErrorSpan>}
          <FormLabel> Date of Birth</FormLabel>
          <TextField
            disabled={!isEdit}
            type="date"
            {...register("dob", { required: true })}
          />
          {errors.dob && <ErrorSpan>This field is required</ErrorSpan>}
          <FormLabel> Address</FormLabel>
          <TextField
            disabled={!isEdit}
            type="text"
            {...register("address", { required: true })}
          />
          {errors.address && <ErrorSpan>This field is required</ErrorSpan>}
          <FormLabel> Current Roll Number</FormLabel>
          <TextField
            disabled={!isEdit}
            type="number"
            {...register("currentRoll")}
          />
          {errors.currentRoll && <ErrorSpan>This field is required</ErrorSpan>}
          <FormLabel> Current Section</FormLabel>
          <Controller
            name="currentSection"
            disabled={!isEdit}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || "A"}
                onChange={field.onChange}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            )}
          />
          {errors.currentSection && (
            <ErrorSpan>This field is required</ErrorSpan>
          )}
          <FormLabel> Current Class</FormLabel>
          <Controller
            disabled={!isEdit}
            name="currentClass"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Select
                labelId="admission-class-label"
                id="admissionClass"
                value={value === undefined ? "L.K.G" : value} // Ensuring value is never undefined
                onChange={onChange}
                {...field}
              >
                {["Nur.", "L.K.G", "U.K.G", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                  (item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
            )}
          />
          {student.isRegistered && (
            <Button
              variant="contained"
              onClick={() => setIsEdit((prev) => !prev)}
            >
              {isEdit ? "Cancel" : "Edit"}
            </Button>
          )}
          {isEdit && (
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isEdit}
            >
              {isSubmitting ? <CircularProgress /> : "Submit"}
            </Button>
          )}
        </Stack>
      </Card>
    </Container>
  );
}

export default StudentProfile;

function GeneralDetails({ student }: { student: Student }) {
  const [openUnregisterDialog, setOpenUnregisterDialog] = useState(false);
  const { handleStudentUnregisterRequest } = useFirebaseFunctions();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleUnregisterClick = () => {
    setOpenUnregisterDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenUnregisterDialog(false);
  };

  const handleConfirmUnregister = async () => {
    // Handle the unregister action here
    setLoading(true);
    const response = await handleStudentUnregisterRequest(student.admissionNo);
    if (!response.success) {
      enqueueSnackbar(response.message, { variant: "error" });
      setLoading(false);
      return;
    }
    enqueueSnackbar(response.message, { variant: "success" });
    setOpenUnregisterDialog(false);
    setLoading(false);
  };

  return (
    <>
      <Table aria-label="student details">
        <TableBody>
          <TableRow>
            <TableCell variant="head">Student Profile</TableCell>
            <TableCell>
              <Typography fontWeight={600}>{student.name}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Admission Number</TableCell>
            <TableCell>{student.admissionNo}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Admission Class</TableCell>
            <TableCell>{student.admissionClass}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Admission Year</TableCell>
            <TableCell>{student.admissionYear}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>
              {student.isRegistered ? (
                <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
                  <CheckCircleIcon color="success" />
                  <Typography display="inline">Registered</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleUnregisterClick}
                  >
                    Unregister
                  </Button>
                </Stack>
              ) : (
                <Typography color="error">Unregistered</Typography>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog
        open={openUnregisterDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Unregistration"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to unregister this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleConfirmUnregister}
            autoFocus
            color="error"
          >
            {loading ? <CircularProgress /> : "Unregister"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
