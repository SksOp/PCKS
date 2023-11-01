import { Request, Response } from "express";

async function handleRollChange(req: Request, res: Response) {
  res.status(200).json({ message: "Roll Change" });
}

async function handleClassChange(req: Request, res: Response) {
    res.status(200).json({ message: "Class Change" });
    
}
export { handleRollChange,handleClassChange};
