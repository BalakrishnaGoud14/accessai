import { useState, useEffect } from "react";
import { api } from "../services/api";
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

export default function ApprovalTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await api.getPendingRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await api.updateRequestStatus(requestId, "APPROVED");
      fetchRequests(); // Refresh
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await api.updateRequestStatus(requestId, "REJECTED");
      fetchRequests(); // Refresh
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const getRiskColor = (risk) => {
    const r = risk ? risk.toLowerCase() : "";
    if (r.includes("low")) return "success";
    if (r.includes("medium")) return "warning";
    if (r.includes("high")) return "error";
    return "default";
  };

  if (loading) return <Typography sx={{ p: 3 }}>Loading pending requests...</Typography>;

  if (requests.length === 0) return <Typography sx={{ p: 3 }}>No pending requests found.</Typography>;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        maxHeight: "calc(100vh - 350px)",
        overflow: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Employee</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Application</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Requested</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Risk Level</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100", minWidth: 350 }}>AI Risk Analysis</TableCell>
            <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow
              key={request.id}
              hover
              sx={{ bgcolor: index % 2 === 0 ? "white" : "grey.50" }}
            >
              <TableCell>#{request.id}</TableCell>
              <TableCell>{request.user?.name || "Unknown"}</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{request.applicationName}</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>
                {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}
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
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 18, color: "#2563eb", mt: 0.2, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
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
                      sx={{ color: "success.main" }}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject">
                    <IconButton
                      size="small"
                      onClick={() => handleReject(request.id)}
                      sx={{ color: "error.main" }}
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