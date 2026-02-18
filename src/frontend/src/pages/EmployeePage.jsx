import React from "react";
// src/pages/EmployeePage.jsx
import { Typography, Box } from "@mui/material";
import AccessRequestForm from "../components/AccessRequestForm.jsx";

export default function EmployeePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Request Access
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Submit access requests for applications and resources.
      </Typography>
      <AccessRequestForm />
    </Box>
  );
}
