import {
  Button,
  CircularProgress,
  Container,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "src/hooks/router";
import { useFirebaseFunctions } from "src/hooks/server";
import { paths } from "src/router";

type AdmissionNoForm = {
  admissionNo: string;
};

export default function AdmissionNoForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdmissionNoForm>();

  const { getAdmissionNoAvaibility } = useFirebaseFunctions();
  const { enqueueSnackbar } = useSnackbar();
  const params = useSearchParams();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<AdmissionNoForm> = async (input) => {
    const { admissionNo } = input;
    const data = await getAdmissionNoAvaibility(admissionNo);
    if (!data.isAvailable) {
      enqueueSnackbar(data.message, { variant: "error" });
      return;
    }
    params.set("admissionNo", admissionNo);
    enqueueSnackbar("Admission Number is available", { variant: "success" });
    push(`${paths.dashboard.student.add}?${params.toString()}`);
  };

  return (
    <Container maxWidth="sm">
      <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
        <FormLabel> Write the Unique Admission Number</FormLabel>
        <TextField
          type="text"
          {...register("admissionNo", { required: true })}
        />
        {errors.admissionNo && <span>This field is required</span>}
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress /> : "Submit"}
        </Button>
      </Stack>
    </Container>
  );
}
