import { Skeleton } from "@mui/material";
import React from "react";
import { useBatch, useSemester } from "src/hooks/db";

function ResultDashBoard() {
  const { currentBatch, loading: batchLoading } = useBatch();
  if (batchLoading) {
    return <Skeleton variant="rectangular" height={400} />;
  }
  if (!currentBatch) return <>There was some error in getting batch</>;
  const { value, loading, error } = useSemester({ batch: currentBatch });
  if (loading) {
    return <Skeleton variant="rectangular" height={400} />;
  }
  if (error) {
    return <>There was some error in getting semester results</>;
  }
  return <></>;
}

export default ResultDashBoard;
