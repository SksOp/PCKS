import { Request, Response } from "express";
import { STUDENTS_COLLECTION } from "../../../db";
import {
  GetAdmissionNoAvaibilityRequest,
  GetAdmissionNoAvaibilityResponse,
  HandleAdmissionRequest,
  HandleAdmissionResponse,
} from "types";
import { logger } from "firebase-functions/v2";
import { HandleStudentUpdateRequest, HandleStudentUpdateResponse } from "types";

export async function getAdmissionNoAvaibility(req: Request, res: Response) {
  const admissionNo = req.params.admissionNo as string;
  console.log(admissionNo);
  try {
    const isPresent = await STUDENTS_COLLECTION.doc(admissionNo).get();
    const response: GetAdmissionNoAvaibilityResponse = {
      success: true,
      message: "No assigned",
    };
    if (!isPresent.exists) {
      res.status(200).json({ ...response, isAvailable: true });
      return;
    }

    // found // registered
    response.isAvailable = false;
    response.message = "Already assigned";
    res.status(200).json(response);
  } catch (e) {
    const response: GetAdmissionNoAvaibilityResponse = {
      success: false,
      message: (e as Error)?.message || "Failed to check availability",
    };
    res.status(500).json(response);
  }
}

export async function handleAdmission(req: Request, res: Response) {
  {
    const admissionNo = req.params.admissionNo;
    const data = req.body.data as HandleAdmissionRequest;

    const newStudentref = STUDENTS_COLLECTION.doc(admissionNo);

    try {
      await newStudentref.set({ ...data, isRegistered: true }, { merge: true });

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

export async function handleStudentUpdate(req: Request, res: Response) {
  const admissionNo = req.params.admissionNo;
  const data = req.body.data as HandleStudentUpdateRequest;

  const studentRef = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    await studentRef.update({
      ...data,
    });

    const response: HandleStudentUpdateResponse = {
      success: true,
      message: "Class updated successfully.",
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Error updating Class: ", error);

    const response: HandleStudentUpdateResponse = {
      success: false,
      message: (error as Error)?.message || "Failed to update Class",
    };

    res.status(500).json(response);
  }
}
