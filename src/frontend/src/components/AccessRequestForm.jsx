import React from "react";
// src/components/AccessRequestForm.jsx
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  MenuItem,
} from "@mui/material";

const MOCK_APPS = [
  "Salesforce",
  "Slack",
  "Google Workspace",
  "Database Admin",
  "HR System",
];

export default function AccessRequestForm() {
  const [formData, setFormData] = useState({
    application: "",
    justification: "",
  });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const canSubmit = formData.application && formData.justification;

  return (
    <Box sx={{ maxWidth: 600, mt: 2 }}>
      {status === "success" && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Access request submitted successfully! Pending manager approval.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            select
            label="Application"
            name="application"
            value={formData.application}
            onChange={(e) => setFormData({ ...formData, application: e.target.value })}
            required
            disabled={status === "success"}
          >
            {MOCK_APPS.map((app) => (
              <MenuItem key={app} value={app}>{app}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Justification"
            name="justification"
            multiline
            rows={4}
            value={formData.justification}
            onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
            required
            disabled={status === "success"}
            helperText="Explain why you need access to this application"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!canSubmit || status === "submitting" || status === "success"}
          >
            {status === "submitting" ? "Submitting..." : "Submit Request"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
