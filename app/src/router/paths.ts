export const paths = {
  root: "/",
  dashboard: {
    root: "/dashboard",
    student: {
      root: "/dashboard/student",
      profile: "/dashboard/student/profile/:admissionNo",
      add: "/dashboard/student/add/:admissionNo",
    },
    result: {
      root: "/dashboard/result",
    },
  },
};
