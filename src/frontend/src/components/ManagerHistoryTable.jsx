import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Typography,
    Box,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { api } from "../services/api";

export default function ManagerHistoryTable() {
    const [requests, setRequests] = useState([]);
    const user = JSON.parse(localStorage.getItem("accessai_user"));

    useEffect(() => {
        if (user) {
            api.getAllRequests(user.role, user.id)
                .then((data) => {
                    // Sort by ID descending (newest first) client-side for now
                    const sorted = data.sort((a, b) => b.id - a.id);
                    setRequests(sorted);
                })
                .catch((err) => console.error("Failed to load history", err));
        }
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "APPROVED":
                return "success";
            case "REJECTED":
                return "error";
            case "PENDING_MANAGER":
            case "PENDING_SECURITY":
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
                border: "1px solid",
                borderColor: "grey.200",
                flexGrow: 1, // Fill remaining space
                minHeight: 0, // Allow shrinking for scroll
                overflow: "auto"
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Employee</TableCell>
                        <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Application</TableCell>
                        <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100", minWidth: 250 }}>AI Analysis</TableCell>
                        <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Rejection Reason</TableCell>
                        <TableCell sx={{ fontWeight: 700, bgcolor: "grey.100" }}>Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No request history found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        requests.map((req) => (
                            <TableRow key={req.id} hover>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        {req.user?.name || "Unknown"}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {req.user?.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>{req.applicationName}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                        <InfoOutlinedIcon sx={{ fontSize: 16, color: "#2563eb", mt: 0.3 }} />
                                        <Typography variant="body2" fontSize="0.8rem">
                                            {req.aiExplanation}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={req.status === "PENDING_MANAGER" ? "PENDING" : req.status.replace(/_/g, " ")}
                                        color={getStatusColor(req.status)}
                                        size="small"
                                        sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: 'error.main', fontSize: "0.85rem" }}>
                                    {req.rejectionReason || "-"}
                                </TableCell>
                                <TableCell variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                                    {req.createdAt ? new Date(req.createdAt).toLocaleString() : "N/A"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
