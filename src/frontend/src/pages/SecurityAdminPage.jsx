// src/pages/SecurityAdminPage.jsx
import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Tabs, Tab } from "@mui/material";
import ApprovalTable from "../components/ApprovalTable.jsx";
import ManagerHistoryTable from "../components/ManagerHistoryTable.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function SecurityAdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
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
      navigate("/security?tab=history");
    } else {
      navigate("/security");
    }
  };

  return (
    <Box sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {tabValue === 0 ? "Security Dashboard" : "Security History"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tabValue === 0
              ? "Review high-risk requests and monitor system audit logs."
              : "View history of high-risk requests processed."}
          </Typography>
        </Box>
        <Button variant="outlined" onClick={() => navigate("/audit")}>
          View Audit Logs
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {tabValue === 0 && <ApprovalTable type="SECURITY" />}
        {tabValue === 1 && <ManagerHistoryTable />}
      </Box>
    </Box>
  );
}