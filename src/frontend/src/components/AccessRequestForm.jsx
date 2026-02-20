import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
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
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    application: "",
    justification: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const result = await api.submitAccessRequest(user.id, formData.application, formData.justification);
      if (result.id) {
        setStatus("success");
        setFormData({ application: "", justification: "" });
      } else {
        setStatus("error");
        setError("Failed to submit request.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setError("Network error occurred.");
    }
  };

  const canSubmit = formData.application && formData.justification && user;

  return (
    <Box sx={{ maxWidth: 600, mt: 2 }}>
      {status === "success" && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Access request submitted successfully! Pending manager approval.
        </Alert>
      )}

      {status === "error" && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
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
