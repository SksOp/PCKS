import { Request, Response } from "express";
import { STUDENTS_COLLECTION } from "../../db";

async function handleRollChange(req: Request, res: Response) {
  const { updatedRoll, admissionNo } = req.body;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);
}

async function handleClassChange(req: Request, res: Response) {
  res.status(200).json({ message: "Class Change" });
}
export { handleRollChange, handleClassChange };
