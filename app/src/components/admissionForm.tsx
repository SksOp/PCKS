import {
  Button,
  CircularProgress,
  Container,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HandleAdmissionRequest>();

  useEffect(() => {
    if (!admissionNo) {
      replace(paths.dashboard.student.add);
      return;
    }
    const checkAdmissionNo = async () => {
      const data = await getAdmissionNoAvaibility(admissionNo);
      if (!data.success || !data.isAvailable)
        replace(paths.dashboard.student.add);
    };
    checkAdmissionNo();
  }, [params]);

  const onSubmit = async (TextField: HandleAdmissionRequest) => {
    const data = await handleAdmissionRequest(admissionNo as string, TextField);
    if (!data.success) {
      enqueueSnackbar(data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(data.message, { variant: "success" });
    replace(paths.dashboard.student.root);
  };

  return (
    <Container maxWidth="sm">
      <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
        <FormLabel> Name</FormLabel>
        <TextField type="text" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
        <FormLabel> Father Name</FormLabel>
        <TextField
          type="text"
          {...register("fatherName", { required: true })}
        />
        {errors.fatherName && <span>This field is required</span>}
        <FormLabel> Mother Name</FormLabel>
        <TextField
          type="text"
          {...register("motherName", { required: true })}
        />
        {errors.motherName && <span>This field is required</span>}
        <FormLabel> Admission Year</FormLabel>
        <TextField
          type="number"
          {...register("admissionYear", { required: true })}
        />
        {errors.admissionYear && <span>This field is required</span>}
        <FormLabel> Admission Class</FormLabel>
        <TextField
          type="text"
          {...register("admissionClass", { required: true })}
        />
        {errors.admissionClass && <span>This field is required</span>}
        <FormLabel> Current Class</FormLabel>
        <TextField
          type="text"
          {...register("currentClass", { required: true })}
        />
        {errors.currentClass && <span>This field is required</span>}
        <FormLabel> Current Section</FormLabel>
        <TextField
          type="text"
          {...register("currentSection", { required: true })}
        />
        {errors.currentSection && <span>This field is required</span>}
        <FormLabel> Current Roll</FormLabel>
        <TextField
          type="number"
          {...register("currentRoll", { required: true })}
        />
        {errors.currentRoll && <span>This field is required</span>}
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress /> : "Submit"}
        </Button>
      </Stack>
    </Container>
  );
}

export default AdmissionForm;
