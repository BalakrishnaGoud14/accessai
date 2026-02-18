// src/components/RoleSelector.jsx
import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ApprovalIcon from "@mui/icons-material/ThumbUpAlt";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext.jsx";

export default function RoleSelector() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "EMPLOYEE",
      title: "Employee",
      description: "Request access to applications and resources",
      icon: <PersonIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      path: "/employee",
    },
    {
      id: "MANAGER",
      title: "Manager",
      description: "Approve access requests from your team",
      icon: <ApprovalIcon sx={{ fontSize: 40, color: "#16a34a" }} />,
      path: "/manager",
    },
    {
      id: "SECURITY_ADMIN",
      title: "Security Admin",
      description: "Review high-risk access requests",
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#ea580c" }} />,
      path: "/security-admin",
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    setRole(role.id);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigate(roles.find((r) => r.id === selectedRole).path);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 620,
          p: 5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.200",
          bgcolor: "white",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo + AccessAI */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#2563eb",
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
              AI
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            AccessAI
          </Typography>
        </Box>

        {/* Title */}
        <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
          Select Your Role
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Choose your role to access the appropriate dashboard
        </Typography>

        {/* Role Cards */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          {roles.map((role) => (
            <Card
              key={role.id}
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid",
                borderColor: selectedRole === role.id ? "#2563eb" : "grey.200",
                bgcolor: selectedRole === role.id ? "#eff6ff" : "white",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "#2563eb",
                  bgcolor: "#f8fafc",
                },
              }}
              onClick={() => handleRoleSelect(role)}
            >
              <Stack direction="row" alignItems="center" spacing={2.5}>
                <Box>{role.icon}</Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {role.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {role.description}
                  </Typography>
                </Box>
                {selectedRole === role.id && (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: "#2563eb",
                    }}
                  />
                )}
              </Stack>
            </Card>
          ))}
        </Stack>

        {/* Continue Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleContinue}
          disabled={!selectedRole}
          sx={{
            py: 1.25,
            bgcolor: "#2563eb",
            fontSize: "0.9375rem",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1d4ed8",
              boxShadow: "none",
            },
            "&:disabled": {
              bgcolor: "grey.300",
              color: "grey.500",
            },
          }}
        >
          Continue to Dashboard
        </Button>
      </Card>
    </Box>
  );
}