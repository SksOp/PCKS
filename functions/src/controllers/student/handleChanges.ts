import { Request, Response } from "express";
import { STUDENTS_COLLECTION } from "../../db";
import {
  HandleRollChangeRequest,
  HandleRollChangeResponse,
  HandleClassChangeRequest,
  HandleClassChangeResponse,
  HandleSectionChangeRequest,
  HandleSectionChangeResponse,
  HandleNameChangeRequest,
  HandleNameChangeResponse,
} from "types";
import { logger } from "firebase-functions/v2";

async function handleClassChange(req: Request, res: Response) {
  const { updatedClass, admissionNo } = req.body as HandleClassChangeRequest;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    await updated_data.update({
      currentClass: updatedClass,
    });

    const response: HandleClassChangeResponse = {
      success: true,
      message: "Class updated successfully.",
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Error updating Class: ", error);

    const response: HandleClassChangeResponse = {
      success: false,
      message: (error as Error)?.message || "Failed to update Class",
    };

    res.status(500).json(response);
  }
}

async function handleSectionChange(req: Request, res: Response) {
  const { updatedSection, admissionNo } =
    req.body as HandleSectionChangeRequest;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    await updated_data.update({
      currentSection: updatedSection,
    });

    const response: HandleSectionChangeResponse = {
      success: true,
      message: "Section updated successfully.",
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Error updating Section: ", error);

    const response: HandleSectionChangeResponse = {
      success: false,
      message: (error as Error)?.message || "Failed to update Section",
    };

    res.status(500).json(response);
  }
}

async function handleNameChange(req: Request, res: Response) {
  const { updatedName, admissionNo } = req.body as HandleNameChangeRequest;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    await updated_data.update({
      name: updatedName,
    });

    const response: HandleNameChangeResponse = {
      success: true,
      message: "Name updated successfully.",
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error("Error updating Name: ", error);

    const response: HandleNameChangeResponse = {
      success: false,
      message: (error as Error)?.message || "Failed to update Name",
    };

    res.status(500).json(response);
  }
}

// as discussed we wont use handleRollchange function for now
// roll will be automatically updated on the release of the result

// async function handleRollChange(req: Request, res: Response) {
//   const { updatedRoll, admissionNo } = req.body as HandleRollChangeRequest;
//   const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

//   try {
//     await updated_data.update({
//       currentRoll: updatedRoll,
//     });

//     const response: HandleRollChangeResponse = {
//       success: true,
//       message: "RollNo updated successfully",
//     };

//     res.status(200).json(response);
//   } catch (e) {
//     logger.error("Error updating RollNo: ", e);

//     const response: HandleRollChangeResponse = {
//       success: false,
//       message: (e as Error)?.message || "Failed to update RollNo",
//     };

//     res.status(500).json(response);
//   }
// }

export {
  // handleRollChange,
  handleClassChange,
  handleSectionChange,
  handleNameChange,
};
