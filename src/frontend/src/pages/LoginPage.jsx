// src/pages/LoginPage.jsx
import React from "react";
import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate("/select-role");
    } else {
      setError(result.error);
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
          maxWidth: 420,
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
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to access your AccessAI account
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            size="small"
            sx={{ mb: 2.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            size="small"
            sx={{ mb: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: "0.875rem",
                color: "#2563eb",
                fontWeight: 500,
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.25,
              bgcolor: "#2563eb",
              fontSize: "0.9375rem",
              fontWeight: 600,
              textTransform: "none",
              mb: 3,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#1d4ed8",
                boxShadow: "none",
              },
            }}
          >
            Sign in
          </Button>

          <Typography variant="body2" align="center" color="text.secondary">
            Don't have an account?{" "}
            <Link
              onClick={() => navigate("/register")}
              sx={{
                color: "#2563eb",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}