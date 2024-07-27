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
  Box,
  Card,
  CardContent,
} from "@mui/material";
import reportService from "../services/reportService";
import { Star } from "@mui/icons-material";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    reportService.getReports().then((data) => {
      setReports(data);
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, #ffffff 0%, #a3c2e1 100%)",
        padding: 20,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 8,
            padding: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 2,
              width: "100%",
              maxWidth: 800,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Admin Profile
              </Typography>
              <Typography variant="body1" gutterBottom>
                Name: John Doe
              </Typography>
              <Typography variant="body1" gutterBottom>
                Role: Admin
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: admin@example.com
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Star sx={{ color: "gold", marginRight: 1 }} />
                <Typography variant="body1">Admin Level: 5</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Paper
          sx={{
            padding: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Reports
          </Typography>
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
    </div>
  );
};

export default AdminDashboard;
