import { Request, Response } from "express";
import { STUDENTS_COLLECTION } from "../../db";

async function handleRollChange(req: Request, res: Response) {
  const { updatedRoll, admissionNo } = req.body;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    // Update the 'currentRoll' field of the existing document
    await updated_data.update({
      currentRoll: updatedRoll,
    });

    res.status(200).json({ message: "RollNo updated successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error updating RollNo: ", error);
    res.status(500).json({ error: "Failed to update RollNo." });
  }
}

async function handleClassChange(req: Request, res: Response) {
  const { updatedClass, admissionNo } = req.body;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    // Update the 'current_class' field of the existing document
    await updated_data.update({
      currentClass: updatedClass,
    });

    res.status(200).json({ message: "Class updated successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error updating Class: ", error);
    res.status(500).json({ error: "Failed to update Class." });
  }
}

async function handleSectionChange(req:Request,res:Response){
  const { updatedSection, admissionNo } = req.body;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    // Update the 'current_section' field of the existing document
    await updated_data.update({
      currentSection: updatedSection,
    });

    res.status(200).json({ message: "Section updated successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error updating Section: ", error);
    res.status(500).json({ error: "Failed to update Section." });
  }
}

async function handleNameChange(req:Request,res:Response){
  const { updatedName, admissionNo } = req.body;
  const updated_data = STUDENTS_COLLECTION.doc(admissionNo);

  try {
    // Update the 'name' field of the existing document
    await updated_data.update({
      name: updatedName,
    });

    res.status(200).json({ message: "Name updated successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error updating Name: ", error);
    res.status(500).json({ error: "Failed to update Name." });
  }
}
export { handleRollChange, handleClassChange, handleSectionChange, handleNameChange };
