import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import reportService from "../services/reportService";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    reportService.getReports().then((data) => {
      setReports(data);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.description}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
