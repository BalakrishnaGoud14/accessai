import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function ApprovalTable({ type = "MANAGER" }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    fetchRequests();
  }, [type]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      let data;
      if (type === "SECURITY") {
        data = await api.getSecurityPendingRequests();
      } else {
        data = await api.getPendingRequests();
      }
      // Sort by newest first (ID descending)
      const sorted = data.sort((a, b) => b.id - a.id);
      setRequests(sorted);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const reviewerRole = type === "SECURITY" ? "SECURITY_ADMIN" : "MANAGER";
      await api.updateRequestStatus(requestId, "APPROVED", reviewerRole, user?.id);
      fetchRequests(); // Refresh
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleRejectClick = (requestId) => {
    setSelectedRequestId(requestId);
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    setRejectionReason("");
    setSelectedRequestId(null);
  };

  const handleRejectConfirm = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    try {
      const reviewerRole = type === "SECURITY" ? "SECURITY_ADMIN" : "MANAGER";
      await api.updateRequestStatus(selectedRequestId, "REJECTED", reviewerRole, user?.id, rejectionReason);
      handleCloseRejectDialog();
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

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "grey.200",
          flexGrow: 1, // Fill remaining space
          minHeight: 0,
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
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No pending requests found.</TableCell>
              </TableRow>
            ) : (
              requests.map((request, index) => (
                <TableRow
                  key={request.id}
                  hover
                  sx={{ bgcolor: index % 2 === 0 ? "white" : "grey.50" }}
                >
                  <TableCell>#{request.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {request.user?.name || "Unknown"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {request.user?.email}
                    </Typography>
                  </TableCell>
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
                          onClick={() => handleRejectClick(request.id)}
                          sx={{ color: "error.main" }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Rejection Dialog */}
      <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog} fullWidth maxWidth="sm">
        <DialogTitle>Reject Request</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please provide a reason for rejecting this request. This reason will be visible to the employee.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="rejectionReason"
            label="Reason for Rejection"
            type="text"
            fullWidth
            variant="outlined"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            multiline
            rows={3}
            required
            error={!rejectionReason.trim() && rejectionReason !== ""}
            helperText={!rejectionReason.trim() && rejectionReason !== "" ? "Reason is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog}>Cancel</Button>
          <Button
            onClick={handleRejectConfirm}
            color="error"
            variant="contained"
            disabled={!rejectionReason.trim()}
          >
            Reject Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}