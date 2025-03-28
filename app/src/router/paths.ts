export const paths = {
  root: "/",
  dashboard: {
    root: "/dashboard",
    student: {
      root: "/dashboard/student",
      profile: "/dashboard/student/profile/:admissionNo",
      add: "/dashboard/student/add",
      all: "/dashboard/student/all",
    },
    result: {
      root: "/dashboard/result",
      batch: "/dashboard/result/batch/",
      view: "/dashboard/result/view",
      add: "/dashboard/result/add",
      ranking: "/dashboard/result/ranking",
    },
  },
  logout: "/logout",
};
