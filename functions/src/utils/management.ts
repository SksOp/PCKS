import dayjs from "dayjs";
import { MANAGEMENT_COLLECTION } from "../db";

export const initiateManagement = async () => {
  const managementDoc = await MANAGEMENT_COLLECTION.doc("management").get();
  if (!managementDoc.exists) {
    await MANAGEMENT_COLLECTION.doc("management").set({
      currentAdmissionNo: 1,
      currentBatch: dayjs().year(),
      allowedEmails: [
        "shubhaman47@gmail.com",
        "premchandrakidsschool@gmail.com",
        "sumankumarraju022@gmail.com",
      ],
    });
  }
};

export const refreshAllowedEmails = async () => {
  const managementDocRef = MANAGEMENT_COLLECTION.doc("management");
  const defaultAllowedEmails = [
    "shubhaman47@gmail.com",
    "premchandrakidsschool@gmail.com",
    "sumankumarraju022@gmail.com",
  ];
  const response = await managementDocRef.update({
    allowedEmails: defaultAllowedEmails,
  });
  return defaultAllowedEmails;
};

export const bookAdmissionNo = async () => {
  const managementDoc = await MANAGEMENT_COLLECTION.doc("management").get();
  const managementData = managementDoc.data();
  const currentAdmissionNo = managementData?.currentAdmissionNo;
  const currentBatch = managementData?.currentBatch;
  await MANAGEMENT_COLLECTION.doc("management").set(
    {
      currentAdmissionNo: currentAdmissionNo + 1,
    },
    { merge: true }
  );
  // Ensure that the sequential number is at least three digits
  const paddedAdmissionNo = String(currentAdmissionNo).padStart(3, "0");
  return `${currentBatch}${paddedAdmissionNo}`;
};

export const getManagementData = async () => {
  const managementDoc = await MANAGEMENT_COLLECTION.doc("management").get();
  const managementData = managementDoc.data();
  return managementData;
};
