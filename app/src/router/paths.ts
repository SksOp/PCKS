export const paths = {
  root: "/",
  dashboard: {
    root: "/dashboard",
    student: {
      root: "/dashboard/student",
      profile: "/dashboard/student/profile/:admissionNo",
      add: "/dashboard/student/add",
    },
    result: {
      root: "/dashboard/result",
      batch: "/dashboard/result/:batch",
      view: "/dashboard/result/view",
    },
  },
  logout: "/logout",
};
