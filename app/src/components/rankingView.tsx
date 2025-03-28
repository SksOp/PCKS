import {
  Paper,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
  Box,
  Container,
  Grid,
  styled,
  LinearProgress,
  Stack,
} from "@mui/material";
import React from "react";
import { GetRankingResponse, Ranking } from "types";
import { Header, TableCell, TableRow } from "./resultView";

export const RankingView = ({
  ranking,
  term,
  batch,
  classKey,
}: {
  ranking: Ranking[];
  term: string;
  batch: string;
  classKey: string;
}) => {
  return (
    <Container maxWidth="md" sx={{ p: "10px" }}>
      <Header term={term} year={batch} />
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Class {classKey}
      </Typography>
      <RankingTable ranking={ranking} />
    </Container>
  );
};

function RankingTable({ ranking }: { ranking: Ranking[] }) {
  console.log(ranking);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S. No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Roll</TableCell>
            <TableCell>Total Marks</TableCell>
            <TableCell>Obtained Marks</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((rank, index) => (
            <TableRow
              key={rank.name}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "#eeeeee",
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{rank.name}</TableCell>
              <TableCell>{rank.roll}</TableCell>
              <TableCell>{rank.totalMarks}</TableCell>
              <TableCell>{rank.obtainedMarks}</TableCell>
              <TableCell>{rank.percentage}</TableCell>
              <TableCell>{rank.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
