// src/components/Navbar.jsx - UPDATE to add Admin menu item
import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ApprovalIcon from "@mui/icons-material/ThumbUpAlt";
import SecurityIcon from "@mui/icons-material/Security";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate, useLocation } from "react-router-dom";
// import { useRole } from "../context/RoleContext.jsx"; // Removed
import { useAuth } from "../context/AuthContext.jsx";

const drawerWidth = 240;

export default function Navbar() {
  const { logout, user } = useAuth();
  const role = user?.role;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = [];

  // Add role-specific menu items
  if (role === "EMPLOYEE") {
    items.push({
      label: "Request Access",
      icon: <PersonIcon />,
      path: "/employee",
    });
    items.push({
      label: "My History",
      icon: <HistoryIcon />,
      path: "/employee?tab=history",
    });
  }

  if (role === "MANAGER") {
    items.push({
      label: "Approvals",
      icon: <ApprovalIcon />,
      path: "/manager",
    });
    items.push({
      label: "Team History",
      icon: <HistoryIcon />,
      path: "/manager?tab=history",
    });
  }

  if (role === "SECURITY_ADMIN") {
    items.push({
      label: "Risk Review",
      icon: <SecurityIcon />,
      path: "/security-admin",
    });
    items.push({
      label: "Security History",
      icon: <HistoryIcon />,
      path: "/security-admin?tab=history",
    });
    items.push({
      label: "Audit Logs",
      icon: <AdminPanelSettingsIcon />, // Or HistoryIcon
      path: "/audit",
    });
  }

  if (role === "ADMIN") {
    items.push({
      label: "Role Management",
      icon: <AdminPanelSettingsIcon />,
      path: "/admin/roles",
    });
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid",
          borderColor: "grey.200",
        },
      }}
    >
      <Toolbar sx={{ borderBottom: "1px solid", borderColor: "grey.200" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#2563eb",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "white", fontWeight: 700 }}>
              AI
            </Typography>
          </Box>
          <Typography variant="h6" noWrap fontWeight={700}>
            AccessAI
          </Typography>
        </Box>
      </Toolbar>

      <Box sx={{ overflow: "auto", flex: 1 }}>
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname + location.search === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "#eff6ff",
                  borderRight: "3px solid #2563eb",
                  "& .MuiListItemIcon-root": {
                    color: "#2563eb",
                  },
                  "& .MuiListItemText-primary": {
                    color: "#2563eb",
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ textTransform: "none" }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}