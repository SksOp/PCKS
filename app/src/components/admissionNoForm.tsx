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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label> Write the Unique Admission Number</label>
      <input type="text" {...register("admissionNo", { required: true })} />
      {errors.admissionNo && <span>This field is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
