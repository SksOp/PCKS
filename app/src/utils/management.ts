import { doc, getDoc } from "firebase/firestore";
import { managementCollection } from "src/firebase";

export async function getCurrentBatch() {
  const managementDoc = await getDoc(doc(managementCollection, "management"));
  const management = managementDoc.data();
  const currentBatch: string = management?.currentBatch;
  if (!currentBatch) {
    return null;
  }
  return currentBatch;
}
