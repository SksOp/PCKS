import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { resultSubCollection } from "src/firebase";
import { getCurrentBatch } from "src/utils/management";

export function useBatch() {
  const [currentBatch, setCurrentBatch] = useState<string | null>(null);
  const [canChangeBatch, setCanChangeBatch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchBatch() {
      setLoading(true);
      try {
        const batch = await getCurrentBatch();
        setCurrentBatch(batch);
        const month = dayjs().month();
        // January is 0 in dayjs, so March is 2 and April is 3
        if (month === 2 || month === 3) {
          setCanChangeBatch(true);
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }

    fetchBatch();
  }, []);

  return useMemo(() => {
    return {
      currentBatch,
      canChangeBatch,
      loading,
      error,
    };
  }, [currentBatch, canChangeBatch]);
}

export function useSemester({ batch }: { batch: string }) {
  console.log("batch", batch);
  const [value, loading, error] = useCollection(resultSubCollection(batch));
  return useMemo(() => {
    return {
      value,
      loading,
      error,
    };
  }, [value, loading, error]);
}
