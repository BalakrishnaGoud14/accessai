// src/App.jsx - ADD the admin route
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RoleProvider } from "./context/RoleContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import EmployeePage from "./pages/EmployeePage.jsx";
import ManagerPage from "./pages/ManagerPage.jsx";
import SecurityAdminPage from "./pages/SecurityAdminPage.jsx";
import AuditPage from "./pages/AuditPage.jsx";
import RoleManagementPage from "./pages/RoleManagementPage.jsx"; // NEW

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },
    background: {
      default: "#f8fafc",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          minWidth: 0,
          width: "100%",
          overflow: "hidden" // Prevent main from scrolling
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RoleProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/employee" element={<EmployeePage />} />
                  <Route path="/manager" element={<ManagerPage />} />
                  <Route path="/security-admin" element={<SecurityAdminPage />} />
                  <Route path="/audit" element={<AuditPage />} />
                  <Route path="/admin/roles" element={<RoleManagementPage />} /> {/* NEW */}
                </Route>

                {/* Redirects */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}