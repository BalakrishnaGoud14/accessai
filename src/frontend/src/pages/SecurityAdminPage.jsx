// src/pages/SecurityAdminPage.jsx
import React from "react";
import { Typography, Box } from "@mui/material";
import ApprovalTable from "../components/ApprovalTable.jsx";

export default function SecurityAdminPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          High Risk Review
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review high-risk access requests requiring security approval.
        </Typography>
      </Box>

      {/* Approval Table */}
      <Box>
        <ApprovalTable />
      </Box>
    </Box>
  );
}