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

  const onSubmit = async (input: HandleAdmissionRequest) => {
    const data = await handleAdmissionRequest(admissionNo as string, input);
    if (!data.success) {
      enqueueSnackbar(data.message, { variant: "error" });
      return;
    }
    enqueueSnackbar(data.message, { variant: "success" });
    replace(paths.dashboard.student.root);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label> Name</label>
      <input type="text" {...register("name", { required: true })} />
      {errors.name && <span>This field is required</span>}
      <label> Father Name</label>
      <input type="text" {...register("fatherName", { required: true })} />
      {errors.fatherName && <span>This field is required</span>}
      <label> Mother Name</label>
      <input type="text" {...register("motherName", { required: true })} />
      {errors.motherName && <span>This field is required</span>}
      <label> Admission Year</label>
      <input type="number" {...register("admissionYear", { required: true })} />
      {errors.admissionYear && <span>This field is required</span>}
      <label> Admission Class</label>
      <input type="text" {...register("admissionClass", { required: true })} />
      {errors.admissionClass && <span>This field is required</span>}
      <label> Current Class</label>
      <input type="text" {...register("currentClass", { required: true })} />
      {errors.currentClass && <span>This field is required</span>}
      <label> Current Section</label>
      <input type="text" {...register("currentSection", { required: true })} />
      {errors.currentSection && <span>This field is required</span>}
      <label> Current Roll</label>
      <input type="number" {...register("currentRoll", { required: true })} />
      {errors.currentRoll && <span>This field is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AdmissionForm;
