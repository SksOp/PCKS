import { collection, query } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { DB, RESULTS_COLLECTION } from "src/firebase";

interface Props {
  batch: string;
  term: string;
}
function ResultBatch({ batch, term }: Props) {
  const collectionPath = `${RESULTS_COLLECTION}/${batch}/${term.toLowerCase()}`;
  console.log(collectionPath);
  const collectionRef = collection(DB, collectionPath);
  const [value, loading, error] = useCollection(collectionRef);
  value?.docs.forEach((doc) => {
    console.log(doc.data());
  });

  return <div>{batch}</div>;
}

export default ResultBatch;
