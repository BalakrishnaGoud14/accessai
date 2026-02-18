import React from "react";
// src/components/LoadingSpinner.jsx
import { CircularProgress, Box, Typography } from "@mui/material";

export default function LoadingSpinner({ size = "medium", message = "Loading..." }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        gap: 2,
        p: 3,
      }}
    >
      <CircularProgress
        size={size === "large" ? 60 : size === "small" ? 24 : 40}
        thickness={4}
        sx={{
          color: "primary.main",
          animationDuration: "800ms",
        }}
      />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}
