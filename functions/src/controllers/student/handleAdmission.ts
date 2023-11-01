import { Request, Response } from "express";
import { STUDENTS_COLLECTION } from "@/db";

async function handleAdmission(req: Request, res: Response) {
  {
    const {
      name,
      fatherName,
      motherName,
      admissionNo,
      admissionYear,
      admissionclass,
      currentClass,
      currentSection,
    } = req.body;
    const aTuringRef = STUDENTS_COLLECTION.doc(admissionNo);
    try {
      await aTuringRef.set(
        {
          name,
          fatherName,
          motherName,
          admissionNo,
          admissionYear,
          currentClass,
          admissionclass,
          currentSection,
        },
        { merge: true }
      );
      res.status(200).json({ message: "Document updated successfully." });
    } catch (err) {
      console.log("Error Created on Updating Document", err);
      res.status(500).json({ error: err });
    }
  }
}

export { handleAdmission };
