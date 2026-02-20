// src/pages/ManagerPage.jsx
import React, { useState, useEffect } from "react";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import ApprovalTable from "../components/ApprovalTable.jsx";
import ManagerHistoryTable from "../components/ManagerHistoryTable.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function ManagerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "history") {
      setTabValue(1);
    } else {
      setTabValue(0);
    }
  }, [location.search]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      navigate("/manager?tab=history");
    } else {
      navigate("/manager");
    }
  };

  return (
    <Box sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {tabValue === 0 ? "Manager Dashboard" : "Team Request History"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tabValue === 0
            ? "Manage pending access requests from your team."
            : "View history of requests you have processed."}
        </Typography>
      </Box>

      {/* Content Area - Flex 1 to take remaining space */}
      <Box sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {tabValue === 0 && <ApprovalTable type="MANAGER" />}
        {tabValue === 1 && <ManagerHistoryTable />}
      </Box>
    </Box>
  );
}