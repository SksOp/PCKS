import { Request, Response } from "express";
import { refreshAllowedEmails } from "../../../utils/management";
import { logger } from "firebase-functions/v2";

export async function refreshAllowedEmailsController(
  req: Request,
  res: Response
) {
  try {
    const defaultAllowedEmails = await refreshAllowedEmails();

    res.status(200).send(defaultAllowedEmails);
  } catch (error) {
    logger.error(error);
    res.status(500).send("error");
  }
}
