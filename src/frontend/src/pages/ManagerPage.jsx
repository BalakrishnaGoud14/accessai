// src/pages/ManagerPage.jsx
import React from "react";
import { Typography, Box } from "@mui/material";
import ApprovalTable from "../components/ApprovalTable.jsx";

export default function ManagerPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4"  gutterBottom>
          Pending Approvals
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review and approve access requests from your team.
        </Typography>
      </Box>

      {/* Approval Table */}
      <Box>
        <ApprovalTable />
      </Box>
    </Box>
  );
}