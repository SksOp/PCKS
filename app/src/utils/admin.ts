import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { managementCollection } from "src/firebase";

export async function validateAdmin(user: User) {
  const managementDoc = await getDoc(doc(managementCollection, "management"));
  const management = managementDoc.data();

  const allowedEmails: string[] = management?.allowedEmails;
  if (!allowedEmails) {
    return false;
  }
  const userEmail = user.email;
  if (!userEmail) {
    return false;
  }
  console.log(allowedEmails, userEmail);
  return allowedEmails.includes(userEmail);
}
