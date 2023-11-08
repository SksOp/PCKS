import dayjs from "dayjs";
import { getDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
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

export function useSemester(batch: string) {
  const docRefFirst = resultSubCollection(`${batch}/first`);
  const docRefSec = resultSubCollection(`${batch}/second`);
  const docRefFour = resultSubCollection(`${batch}/annual`);

  const [firstTerm, loading1] = useCollection(docRefFirst);
  const [secondTerm, loading2] = useCollection(docRefSec);
  const [annual, loading3] = useCollection(docRefFour);

  const exist = {
    isFirstTerm: !firstTerm?.empty,
    isSecondTerm: !secondTerm?.empty,
    isannual: !annual?.empty,
  };

  return useMemo(() => {
    return {
      loading: loading1 || loading2 || loading3,
      firstTerm,
      secondTerm,
      annual,
      exist,
    };
  }, [firstTerm, secondTerm, annual]);
}
