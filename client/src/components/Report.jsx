import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import reportService from "../services/reportService";

const Report = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      const result = await reportService.getReport();
      setReportData(result.data);
    };
    fetchReportData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Report
        </Typography>
        <Typography variant="body1">
          {JSON.stringify(reportData, null, 2)}
        </Typography>
      </Box>
    </Container>
  );
};

export default Report;
