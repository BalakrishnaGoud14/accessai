// src/pages/AuditPage.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import AuditTable from "../components/AuditTable.jsx";

export default function AuditPage() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Fixed Header */}
      <Box sx={{ mb: 3, flexShrink: 0 }}>
        <Typography variant="h4"  gutterBottom>
          Audit Logs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View complete system activity and access history
        </Typography>
      </Box>

      {/* Non-Scrollable Table */}
      <Box sx={{ mt: 0 }}>
        <AuditTable />
      </Box>
    </Box>
  );
}