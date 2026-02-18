// src/components/AuditTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const MOCK_AUDIT_LOGS = [
  {
    id: 1,
    timestamp: "2026-02-14 10:30:15",
    user: "john.doe@company.com",
    action: "Access Request Approved",
    application: "Salesforce",
    status: "success",
    ipAddress: "192.168.1.105",
    aiAnalysis: "Standard CRM access approved by manager. User completed required training. Normal access pattern.",
  },
  {
    id: 2,
    timestamp: "2026-02-14 09:15:42",
    user: "jane.smith@company.com",
    action: "High Risk Access Denied",
    application: "Database Admin",
    status: "rejected",
    ipAddress: "192.168.1.112",
    aiAnalysis: "Elevated privileges denied by security team. User's role doesn't require admin access. Potential security risk flagged.",
  },
  {
    id: 3,
    timestamp: "2026-02-14 08:45:23",
    user: "admin@company.com",
    action: "Emergency Access Granted",
    application: "HR System",
    status: "success",
    ipAddress: "192.168.1.101",
    aiAnalysis: "Emergency override by system admin during incident. Temporary access granted for 24 hours. Automated revocation scheduled.",
  },
  {
    id: 4,
    timestamp: "2026-02-14 07:20:11",
    user: "mike.wilson@company.com",
    action: "Access Request Submitted",
    application: "Google Workspace",
    status: "pending",
    ipAddress: "192.168.1.118",
    aiAnalysis: "New employee onboarding request. Standard access level requested. Awaiting manager approval.",
  },
  {
    id: 5,
    timestamp: "2026-02-13 16:45:33",
    user: "sarah.jones@company.com",
    action: "Role Change Approved",
    application: "AWS Console",
    status: "success",
    ipAddress: "192.168.1.127",
    aiAnalysis: "Promotion to senior role approved. DevOps access expanded with additional cloud resources. Training verification completed.",
  },
  {
    id: 6,
    timestamp: "2026-02-13 15:30:22",
    user: "david.brown@company.com",
    action: "Access Request Rejected",
    application: "Financial System",
    status: "rejected",
    ipAddress: "192.168.1.134",
    aiAnalysis: "Request denied due to policy violation. User recently changed departments. Business justification insufficient.",
  },
  {
    id: 7,
    timestamp: "2026-02-13 14:20:15",
    user: "emily.davis@company.com",
    action: "Access Request Approved",
    application: "Jira",
    status: "success",
    ipAddress: "192.168.1.145",
    aiAnalysis: "Standard project management tool access. User is part of development team. Access approved automatically.",
  },
  {
    id: 8,
    timestamp: "2026-02-13 13:10:42",
    user: "robert.taylor@company.com",
    action: "Two-Factor Auth Enabled",
    application: "All Systems",
    status: "success",
    ipAddress: "192.168.1.156",
    aiAnalysis: "Security enhancement completed. User enabled 2FA across all applications. Compliance requirement met.",
  },
  {
    id: 9,
    timestamp: "2026-02-13 11:45:33",
    user: "lisa.martinez@company.com",
    action: "Password Reset",
    application: "Identity Provider",
    status: "success",
    ipAddress: "192.168.1.167",
    aiAnalysis: "Self-service password reset completed. Security questions verified. No suspicious activity detected.",
  },
  {
    id: 10,
    timestamp: "2026-02-13 10:30:22",
    user: "james.anderson@company.com",
    action: "Bulk Access Revoked",
    application: "Multiple Systems",
    status: "success",
    ipAddress: "192.168.1.178",
    aiAnalysis: "Employee offboarding process. All system access revoked automatically. Exit checklist completed.",
  },
];

export default function AuditTable() {
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        height: "100%",
        maxHeight: "calc(100vh - 350px)", // Adjust based on your layout
        border: "1px solid",
        borderColor: "grey.200",
        overflow: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                width: 60,
              }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                width: 140,
              }}
            >
              Timestamp
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                width: 200,
              }}
            >
              User
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                width: 180,
              }}
            >
              Action
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                width: 150,
              }}
            >
              Application
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                width: 100,
              }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                minWidth: 350,
              }}
            >
              AI Risk Analysis
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
                width: 130,
              }}
            >
              IP Address
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {MOCK_AUDIT_LOGS.map((log, index) => (
            <TableRow
              key={log.id}
              hover
              sx={{
                bgcolor: index % 2 === 0 ? "background.paper" : "grey.50",
                "&:hover": {
                  bgcolor: "#f8fafc !important",
                },
              }}
            >
              <TableCell sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                #{log.id}
              </TableCell>
              <TableCell sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                {log.timestamp}
              </TableCell>
              <TableCell sx={{ fontSize: "0.85rem", fontWeight: 500, color: "primary.main" }}>
                {log.user}
              </TableCell>
              <TableCell sx={{ fontSize: "0.85rem" }}>
                {log.action}
              </TableCell>
              <TableCell sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
                {log.application}
              </TableCell>
              <TableCell>
                <Chip
                  label={log.status.toUpperCase()}
                  size="small"
                  color={getStatusColor(log.status)}
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    minWidth: 80,
                  }}
                />
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <InfoOutlinedIcon
                    sx={{
                      fontSize: 18,
                      color: "#2563eb",
                      mt: 0.2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8125rem",
                      lineHeight: 1.5,
                      color: "text.secondary",
                    }}
                  >
                    {log.aiAnalysis}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ fontSize: "0.8rem", color: "text.secondary", fontFamily: "monospace" }}>
                {log.ipAddress}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}