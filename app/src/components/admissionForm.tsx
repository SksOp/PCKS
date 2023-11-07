import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "src/hooks/router";
import { useFirebaseFunctions } from "src/hooks/server";
import { paths } from "src/router";
import { HandleAdmissionRequest } from "types";

function AdmissionForm() {
  const params = useSearchParams();
  const admissionNo = params.get("admissionNo");
  const { replace } = useRouter();
  const { getAdmissionNoAvaibility, handleAdmissionRequest } =
    useFirebaseFunctions();
  const { enqueueSnackbar } = useSnackbar();

  const [isOldStudent, setIsOldStudent] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<HandleAdmissionRequest>({
    defaultValues: {
      admissionClass: "L.K.G", // Set the default value to an empty string or a valid class
      // ... set up default values for other form fields as needed
    },
  });

  const onSubmit = async (TextField: HandleAdmissionRequest) => {
    const data = await handleAdmissionRequest(admissionNo as string, TextField);
    if (!data.success) {
      enqueueSnackbar(data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(data.message, { variant: "success" });
    const url = `${paths.dashboard.student.root}/profile/${data.admissionNo}`;
    replace(`${paths.dashboard.student.root}/${data.admissionNo}`);
  };

  return (
    <Container maxWidth="sm">
      <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
        {!isOldStudent && (
          <Button variant="contained" onClick={() => setIsOldStudent(true)}>
            Not a new student? old Student
          </Button>
        )}
        {isOldStudent && (
          <>
            <Button variant="contained" onClick={() => setIsOldStudent(false)}>
              Not a old student? New Student
            </Button>
            <FormLabel> Old Admission Number</FormLabel>
            <TextField
              type="number"
              {...register("admissionNo", { required: true })}
            />
            {errors.admissionNo && (
              <ErrorSpan>This field is required</ErrorSpan>
            )}
          </>
        )}
        <FormLabel> Name</FormLabel>
        <TextField type="text" {...register("name", { required: true })} />

        {errors.name && <ErrorSpan>This field is required</ErrorSpan>}
        <FormLabel> Admission Class</FormLabel>
        <Controller
          name="admissionClass"
          control={control}
          rules={{ required: true }}
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

        {errors.admissionClass && <ErrorSpan>This field is required</ErrorSpan>}

        <FormLabel> Father Name</FormLabel>
        <TextField
          type="text"
          {...register("fatherName", { required: true })}
        />
        {errors.fatherName && <ErrorSpan>This field is required</ErrorSpan>}
        <FormLabel> Mother Name</FormLabel>
        <TextField
          type="text"
          {...register("motherName", { required: true })}
        />
        {errors.motherName && <ErrorSpan>This field is required</ErrorSpan>}
        <FormLabel> Admission Year</FormLabel>
        <TextField
          type="number"
          {...register("admissionYear", {
            required: true,
            value: Number(new Date().getFullYear()),
          })}
        />
        {errors.admissionYear && <ErrorSpan>This field is required</ErrorSpan>}
        <FormLabel> Current Class</FormLabel>
        <TextField
          type="text"
          placeholder="If empty, will be same as admission class"
          {...register("currentClass", { required: false })}
        />
        {errors.currentClass && <ErrorSpan>This field is required</ErrorSpan>}
        <FormLabel> Phone</FormLabel>
        <TextField type="number" {...register("phone", { required: true })} />
        {errors.phone && <ErrorSpan>This field is required</ErrorSpan>}
        <FormLabel> Address</FormLabel>
        <TextField type="text" {...register("address", { required: true })} />
        {errors.address && <ErrorSpan>This field is required</ErrorSpan>}
        <FormLabel> DOB</FormLabel>
        <TextField type="date" {...register("dob", { required: true })} />
        {errors.dob && <ErrorSpan>This field is required</ErrorSpan>}
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress /> : "Submit"}
        </Button>
      </Stack>
    </Container>
  );
}

export default AdmissionForm;

function ErrorSpan({ children }: { children: string }) {
  return (
    <Typography component="span" color="red" p="0" m="0">
      {children}
    </Typography>
  );
}
