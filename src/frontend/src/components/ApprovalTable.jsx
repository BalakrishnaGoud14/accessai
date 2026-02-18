// src/components/ApprovalTable.jsx
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
  IconButton,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const MOCK_REQUESTS = [
  {
    id: "#REQ-001",
    employee: "John Doe",
    application: "Salesforce",
    requested: "2026-02-14",
    riskLevel: "Low",
    aiExplanation: "Standard access request for CRM tool. User has appropriate role and training completed. No suspicious patterns detected.",
  },
  {
    id: "#REQ-002",
    employee: "Jane Smith",
    application: "Database Admin",
    requested: "2026-02-14",
    riskLevel: "High",
    aiExplanation: "Elevated privileges requested. User's role typically doesn't require database admin access. Recommend additional approval from Security team.",
  },
  {
    id: "#REQ-003",
    employee: "Mike Wilson",
    application: "AWS Console",
    requested: "2026-02-13",
    riskLevel: "Medium",
    aiExplanation: "Cloud infrastructure access requested. User is in DevOps team but this is their first AWS access request. Monitor initial usage patterns.",
  },
  {
    id: "#REQ-004",
    employee: "Sarah Johnson",
    application: "Financial System",
    requested: "2026-02-13",
    riskLevel: "Medium",
    aiExplanation: "Access to financial data requested. User recently changed departments. Verify business justification and manager approval.",
  },
  {
    id: "#REQ-005",
    employee: "Jacob Doe",
    application: "Udemy",
    requested: "2026-02-12",
    riskLevel: "Low",
    aiExplanation: "Standard access request for Udemy. User has appropriate role. No suspicious patterns detected.",
  },
  {
    id: "#REQ-006",
    employee: "Simran Johnson",
    application: "Financial System",
    requested: "2026-02-11",
    riskLevel: "High",
    aiExplanation: "Access to financial data requested. User is working in front-desk. Recommend additional approval from Security team.",
  },
];

export default function ApprovalTable() {
  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "error";
      default:
        return "default";
    }
  };

  const handleApprove = (requestId) => {
    console.log("Approved:", requestId);
    // API call to approve request
  };

  const handleReject = (requestId) => {
    console.log("Rejected:", requestId);
    // API call to reject request
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        maxHeight: "calc(100vh - 350px)", // Limits height to show ~4 entries
        overflow: "auto", // Enables scrolling
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
              }}
            >
              Request ID
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
              }}
            >
              Employee
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
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
              }}
            >
              Requested
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                bgcolor: "grey.100",
                borderBottom: 2,
                borderColor: "grey.300",
              }}
            >
              Risk Level
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
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {MOCK_REQUESTS.map((request, index) => (
            <TableRow
              key={request.id}
              hover
              sx={{
                bgcolor: index % 2 === 0 ? "white" : "grey.50",
                "&:hover": {
                  bgcolor: "#f8fafc !important",
                },
              }}
            >
              <TableCell sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                {request.id}
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem" }}>
                {request.employee}
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {request.application}
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                {request.requested}
              </TableCell>
              <TableCell>
                <Chip
                  label={request.riskLevel}
                  size="small"
                  color={getRiskColor(request.riskLevel)}
                  sx={{ fontWeight: 600, fontSize: "0.75rem" }}
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
                    {request.aiExplanation}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="Approve">
                    <IconButton
                      size="small"
                      onClick={() => handleApprove(request.id)}
                      sx={{
                        color: "success.main",
                        "&:hover": {
                          bgcolor: "success.lighter",
                        },
                      }}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject">
                    <IconButton
                      size="small"
                      onClick={() => handleReject(request.id)}
                      sx={{
                        color: "error.main",
                        "&:hover": {
                          bgcolor: "error.lighter",
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}