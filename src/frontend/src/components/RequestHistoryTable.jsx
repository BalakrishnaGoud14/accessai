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
} from "@mui/material";
import { api } from "../services/api";

export default function RequestHistoryTable() {
    const [requests, setRequests] = useState([]);
    const user = JSON.parse(localStorage.getItem("accessai_user"));

    useEffect(() => {
        console.log("RequestHistoryTable mounted. User:", user);
        if (user?.id) {
            console.log("Fetching requests for user ID:", user.id);
            api.getUserRequests(user.id)
                .then(data => {
                    console.log("Fetched requests:", data);
                    // Sort by newest first (ID descending)
                    const sorted = data.sort((a, b) => b.id - a.id);
                    setRequests(sorted);
                })
                .catch((err) => console.error("Failed to load history", err));
        } else {
            console.warn("No user ID found in localStorage");
        }
    }, [user]);

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
            sx={{
                mt: 2,
                flexGrow: 1, // Fill remaining space
                minHeight: 0, // Allow shrinking for scroll
                overflow: "auto",
                border: "1px solid",
                borderColor: "grey.200"
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Application</strong></TableCell>
                        <TableCell><strong>Approved/Rejected By</strong></TableCell> {/* Renamed Column */}
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Justification</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Rejection Reason</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center"> {/* Updated colSpan */}
                                No requests found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        requests.map((req) => {
                            // Logic to determine approver
                            let approverName = "-";
                            let approverEmail = "";

                            if (req.securityAdmin) {
                                approverName = req.securityAdmin.name;
                                approverEmail = req.securityAdmin.email;
                            } else if (req.manager) {
                                approverName = req.manager.name;
                                approverEmail = req.manager.email;
                            }

                            return (
                                <TableRow key={req.id}>
                                    <TableCell>{req.applicationName}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="bold">
                                            {approverName}
                                        </Typography>
                                        {approverEmail && (
                                            <Typography variant="caption" color="text.secondary">
                                                {approverEmail}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{req.user?.email || user.email}</TableCell>
                                    <TableCell sx={{ maxWidth: 300 }}>{req.justification}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={req.status === "PENDING_MANAGER" ? "PENDING" : req.status.replace(/_/g, " ")}
                                            color={getStatusColor(req.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: 'error.main' }}>
                                        {req.rejectionReason || "-"}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(req.createdAt || Date.now()).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
