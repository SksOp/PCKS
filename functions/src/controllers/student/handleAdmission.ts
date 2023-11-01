import { Request, Response } from "express";
import { STUDENTS_COLLECTION } from "@/db";

async function handleAdmission(req: Request, res: Response) {
  {
    const {
      name,
      fatherName,
      motherName,
      admissionNo,
      admissionyear,
      admissionclass,
      currentClass,
      crrentSection,
    } = req.body;
    const aTuringRef = STUDENTS_COLLECTION.doc("aturing");
    try {
      await aTuringRef.set(
        {
          name,
          fatherName,
          motherName,
          admissionNo,
          admissionyear,
          currentClass,
          admissionclass,
          crrentSection,
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

export default handleAdmission;
