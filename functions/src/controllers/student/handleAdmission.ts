import { Request, Response } from "express";
import { STUDENTS_COLLECTION } from "../../db";
import {
  HandleAdmissionRequest,
  HandleAdmissionResponse,
  Student,
} from "types";
import { logger } from "firebase-functions/v2";

async function handleAdmission(req: Request, res: Response) {
  {
    const {
      name,
      fatherName,
      motherName,
      admissionNo,
      admissionYear,
      admissionClass,
      currentClass,
      currentSection,
      currentRoll,
    } = req.body as HandleAdmissionRequest;

    const newStudentref = STUDENTS_COLLECTION.doc(admissionNo);

    try {
      await newStudentref.set(
        {
          name,
          fatherName,
          motherName,
          admissionNo,
          admissionYear,
          admissionClass,
          currentClass,
          currentSection,
          currentRoll,
        },
        { merge: true }
      );

      const response: HandleAdmissionResponse = {
        success: true,
        message: "Student added successfully",
      };

      res.status(200).json(response);
    } catch (e) {
      logger.error(e);

      const response: HandleAdmissionResponse = {
        success: false,
        message: (e as Error)?.message || "Failed to update RollNo",
      };

      res.status(500).json(response);
    }
  }
}

export { handleAdmission };
