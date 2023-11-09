import { Request, Response } from "express";
import { getManagementData } from "../../../utils/management";
import { DB, STUDENTS_COLLECTION, resultsCollection } from "../../../db";
import { CreateTermRequest, CreateTermResponse, Result, Student } from "types";
import { FirebaseError } from "firebase-admin";
import { createEmptyResultBasedOnClass } from "../../../utils/result";

export async function createTerm(req: Request, res: Response) {
  const data = req.body.data as CreateTermRequest;
  const term = data.term;
  const managementData = await getManagementData();
  const currentBatch = managementData?.currentBatch;
  if (!currentBatch) {
    const response: CreateTermResponse = {
      message: "No current term found. Please set a current term first",
      success: false,
    };
    return res.status(400).send({ ...response });
  }

  //check if they already exisit

  const pathRef = await DB.collection(resultsCollection)
    .doc(String(currentBatch))
    .listCollections();
  const paths = pathRef.map((path) => path.id);
  const alreadyExists = paths.includes(term);
  if (alreadyExists) {
    const response: CreateTermResponse = {
      message: "Term already exists",
      success: false,
    };
    return res.status(400).send({ ...response });
  }

  // if not exists create a subcollection with the name of the term
  // and push all the registered students in it
  // get all the students from the students collection

  try {
    const studentsSnapshot = await STUDENTS_COLLECTION.where(
      "isRegistered",
      "==",
      true
    ).get();
    const students = studentsSnapshot.docs.map((doc) =>
      doc.data()
    ) as Student[];

    const batch = DB.batch();

    students.forEach((student) => {
      const studentRef = DB.doc(
        `${resultsCollection}/${currentBatch}/${term}/${student.admissionNo}`
      );
      const { currentClass } = student;
      const data: Result = {
        student: student,
        results: {
          meta: {
            term: term,
            year: currentBatch,
          },
          subjects: createEmptyResultBasedOnClass(currentClass),
        },
        attendance: {
          present: 0,
          outOf: 0,
        },
      };
      batch.set(studentRef, data);
    });
    // commit the batch
    await batch.commit();
    const response: CreateTermResponse = {
      message: "Term created successfully",
      success: true,
    };
    return res.status(200).send({ ...response });
  } catch (error: FirebaseError | any) {
    return res.status(500).send({
      message: error.message || "Failed to create term",
      success: false,
    });
  }
}
