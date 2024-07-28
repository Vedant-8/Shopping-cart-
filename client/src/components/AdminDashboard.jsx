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
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import reportService from "../services/reportService";
import authService from "../services/authService";
import messageService from "../services/messageService";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch reports data
    reportService.getReports().then((data) => {
      setReports(data);
    });

    // Fetch admin profile data
    authService.getProfile().then((data) => {
      setProfile(data);
      setEditedProfile(data);
    });
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await authService.updateProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleMessageSubmit = async () => {
    try {
      await messageService.sendMessage(message);
      setMessage("");
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!profile) return null;

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
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 2,
            width: "100%",
            marginBottom: 4,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                alt={profile?.username}
                src={profile?.profileImage || ""}
                sx={{ width: 100, height: 100 }}
              />
              <Box>
                {isEditing ? (
                  <>
                    <TextField
                      label="Username"
                      name="username"
                      value={editedProfile.username}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Phone Number"
                      name="number"
                      value={editedProfile.number}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "#00274d" }}
                    >
                      {profile.username}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#003366" }}>
                      {profile.email}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#003366" }}>
                      Phone Number: {profile.number}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      <Star sx={{ color: "gold", marginRight: 1 }} />
                      <Typography variant="body1">
                        Admin Level: {profile.adminLevel}
                      </Typography>
                    </Box>
                  </>
                )}
                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                    onClick={isEditing ? handleSaveProfile : handleEditToggle}
                    sx={{ borderRadius: 0 }}
                  >
                    {isEditing ? "Save" : "Edit Profile"}
                  </Button>
                  {isEditing && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleEditToggle}
                      sx={{ borderRadius: 0 }}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 2,
            width: "100%",
            marginBottom: 4,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: "#00274d" }}>
              Send Custom Sales Message
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleMessageSubmit}
                sx={{ borderRadius: 0 }}
              >
                Send Message
              </Button>
            </Box>
          </CardContent>
        </Card>

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
