import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import reportService from "../services/reportService";

const Report = ({ onReport }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleReport = async () => {
    try {
      await reportService.createReport(title, description);
      onReport();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Report
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleReport}>
        Create Report
      </Button>
    </Container>
  );
};

export default Report;
