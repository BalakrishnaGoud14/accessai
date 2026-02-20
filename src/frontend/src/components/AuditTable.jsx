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

import { api } from "../services/api";
import { useState, useEffect } from "react";

export default function AuditTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await api.getAuditLogs();
      // Sort by newest first (ID descending)
      const sorted = data.sort((a, b) => b.id - a.id);
      setLogs(sorted);
    } catch (error) {
      console.error("Failed to fetch audit logs", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "success":
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
      case "pending_manager":
      case "pending_security":
        return "warning";
      default:
        return "default";
    }
  };

  if (loading) return <Typography sx={{ p: 3 }}>Loading audit logs...</Typography>;
  if (logs.length === 0) return <Typography sx={{ p: 3 }}>No audit logs found.</Typography>;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        flexGrow: 1,
        minHeight: 0,
        border: "1px solid",
        borderColor: "grey.200",
        overflow: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", width: 60 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", width: 180 }}>Timestamp</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", width: 200 }}>User</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", width: 180 }}>Action</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", width: 150 }}>Application</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", width: 100 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", minWidth: 350 }}>AI Risk Analysis</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", bgcolor: "grey.100", width: 130 }}>IP Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow
              key={log.id}
              hover
              sx={{
                bgcolor: index % 2 === 0 ? "background.paper" : "grey.50",
                "&:hover": { bgcolor: "#f8fafc !important" },
              }}
            >
              <TableCell sx={{ fontSize: "0.85rem", fontWeight: 500 }}>#{log.id}</TableCell>
              <TableCell sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                {new Date(log.timestamp).toLocaleString()}
              </TableCell>
              <TableCell sx={{ fontSize: "0.85rem", fontWeight: 500, color: "primary.main" }}>
                {log.userEmail}
              </TableCell>
              <TableCell sx={{ fontSize: "0.85rem" }}>{log.action}</TableCell>
              <TableCell sx={{ fontSize: "0.85rem", fontWeight: 600 }}>{log.application}</TableCell>
              <TableCell>
                <Chip
                  label={log.status?.toUpperCase()}
                  size="small"
                  color={getStatusColor(log.status)}
                  sx={{ fontSize: "0.75rem", fontWeight: 700, minWidth: 80 }}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 18, color: "#2563eb", mt: 0.2, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontSize: "0.8125rem", lineHeight: 1.5, color: "text.secondary" }}>
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