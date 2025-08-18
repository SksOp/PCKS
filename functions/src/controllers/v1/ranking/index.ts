import { Request, Response } from 'express';
import { DB, resultsCollection, studentsCollection } from '../../../db';
import { GetRankingResponse, Result, Student } from 'types';

const getStudentDetailByAdmissionNo = async (admissionNo: string) => {
  const student = await DB.collection(studentsCollection)
    .doc(admissionNo)
    .get();
  return student.data() as Student;
};

export async function rankingController(req: Request, res: Response) {
  const {
    batch,
    term,
    class: className,
  } = req.params as {
    batch: string;
    term: string;
    class: string;
  };

  console.log(batch, term, className);

  const { content } = req.query;

  const collection = `${resultsCollection}/${batch}/${term}`;

  // Handle both string and number class values
  let classQuery;
  const numericClass = parseInt(className);
  if (isNaN(numericClass)) {
    // For string classes like 'ukg', 'lkg', 'nursery'
    classQuery = DB.collection(collection).where(
      'currentClass',
      '==',
      className
    );
  } else {
    // For numeric classes like 1, 2, etc
    classQuery = DB.collection(collection)
      .where('currentClass', '==', numericClass)
      .where('isCompleted', '==', true);
  }

  const results = await classQuery.get();
  const resultsData = results.docs.map((doc) => doc.data()) as Result[];

  // get details with name, roll, total marks, obtained marks, percentage
  const details = await Promise.all(
    resultsData.map(async (result) => {
      const student = await getStudentDetailByAdmissionNo(result.admissionNo);
      const totalMarks = result.results.subjects.reduce(
        (acc, curr) => acc + (Number(curr.results.fullMarks) ?? 0),
        0
      );
      const obtainedMarks = result.results.subjects.reduce(
        (acc, curr) =>
          acc +
          (Number(curr.results.theory) ?? 0) +
          (Number(curr.results.other) ?? 0),
        0
      );
      const percentage = (
        result.results.subjects.reduce(
          (acc, curr) =>
            acc +
            (Number(curr.results.theory) ?? 0) +
            (Number(curr.results.other) ?? 0),
          0
        ) / result.results.subjects.length
      ).toFixed(2);

      return {
        name: student.name,
        roll: result.currentRoll,
        totalMarks,
        obtainedMarks,
        percentage,
      };
    })
  );

  // Sort by percentage in descending order
  const sortedDetails = details.sort(
    (a, b) => Number(b.percentage) - Number(a.percentage)
  );

  if (content === 'csv') {
    const csvHeader = 'name,roll,totalMarks,obtainedMarks,percentage,rank\n';
    const csvRows = sortedDetails.map(
      (detail, index) =>
        `${detail.name},${detail.roll},${detail.totalMarks},${
          detail.obtainedMarks
        },${detail.percentage},${index + 1}`
    );
    const csvContent = csvHeader + csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ranking-${batch}-${term}-${className}.csv`
    );
    res.status(200).send(csvContent);
  }

  const response: GetRankingResponse = {
    message: 'success',
    success: true,
    data: sortedDetails.map((detail, index) => ({
      name: detail.name,
      roll: detail.roll,
      totalMarks: detail.totalMarks,
      obtainedMarks: detail.obtainedMarks,
      percentage: detail.percentage,
      rank: index + 1,
    })),
  };

  res.status(200).json(response);
}
