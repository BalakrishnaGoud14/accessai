import React, { useState, useEffect } from "react";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import AccessRequestForm from "../components/AccessRequestForm.jsx";
import RequestHistoryTable from "../components/RequestHistoryTable.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmployeePage() {
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
      navigate("/employee?tab=history");
    } else {
      navigate("/employee");
    }
  };

  return (
    <Box sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Title changes based on view */}
      <Typography variant="h4" gutterBottom>
        {tabValue === 0 ? "Request Access" : "Request History"}
      </Typography>

      {tabValue === 0 && (
        <Box sx={{ flexGrow: 1, minHeight: 0, overflow: "auto" }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Submit access requests for applications and resources.
          </Typography>
          <AccessRequestForm />
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            View the status and details of your submitted requests.
          </Typography>
          <RequestHistoryTable />
        </Box>
      )}
    </Box>
  );
}
