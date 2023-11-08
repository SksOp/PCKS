import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Card,
  FormLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { classes } from "src/config";
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
      <Card raised sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          {isOldStudent
            ? "Old Student Admission Form"
            : "New Student Admission Form"}
        </Typography>
        <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
          <Button
            variant="outlined"
            color={isOldStudent ? "primary" : "secondary"}
            onClick={() => setIsOldStudent(!isOldStudent)}
            sx={{ alignSelf: "start" }}
          >
            {isOldStudent
              ? "New Student? Click here."
              : "Already a student? Click here."}
          </Button>

          {/* Toggle between New Student and Old Student fields */}
          {isOldStudent && (
            <TextField
              label="Old Admission Number"
              type="number"
              error={!!errors.admissionNo}
              helperText={errors.admissionNo ? "This field is required" : ""}
              {...register("admissionNo", { required: true })}
              fullWidth
            />
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
                {classes.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {errors.admissionClass && (
            <ErrorSpan>This field is required</ErrorSpan>
          )}

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
            disabled={!isOldStudent}
            {...register("admissionYear", {
              required: true,
              value: Number(new Date().getFullYear()),
            })}
          />
          {errors.admissionYear && (
            <ErrorSpan>This field is required</ErrorSpan>
          )}

          {isOldStudent && (
            <>
              <FormLabel> Current Class</FormLabel>
              <Controller
                name="currentClass"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, ...field } }) => (
                  <Select
                    id="currentClass"
                    // value={value === undefined ? "L.K.G" : value} // Ensuring value is never undefined
                    onChange={onChange}
                    {...field}
                  >
                    {classes.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              {errors.admissionClass && (
                <ErrorSpan>This field is required</ErrorSpan>
              )}
            </>
          )}
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
      </Card>
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
