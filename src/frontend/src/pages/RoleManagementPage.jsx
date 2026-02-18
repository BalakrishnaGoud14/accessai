// src/pages/RoleManagementPage.jsx
import React from "react";
import { api } from "../services/api";
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";



export default function RoleManagementPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleChanges, setRoleChanges] = useState({});
  const [aiDescription, setAiDescription] = useState("");

  // Fetch users on mount
  React.useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (e) {
      console.error("Failed to load users", e);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setRoleChanges({
      ...roleChanges,
      [userId]: newRole,
    });
    // Fetch AI description for the new role
    fetchAiDescription(newRole);
  };

  const fetchAiDescription = async (role) => {
    try {
      const data = await api.getRoleDescription(role);
      setAiDescription(data.description);
    } catch (error) {
      console.error("Failed to fetch AI description", error);
    }
  };

  const handleSaveChanges = async () => {
    // Process all changes
    for (const [userId, newRole] of Object.entries(roleChanges)) {
      await api.updateUserRole(userId, newRole);
    }
    await loadUsers();
    setRoleChanges({});
    setAiDescription("");
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "EMPLOYEE":
        return "#2563eb";
      case "MANAGER":
        return "#16a34a";
      case "SECURITY_ADMIN":
        return "#ea580c";
      case "ADMIN":
        return "#7c3aed";
      default:
        return "grey";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "EMPLOYEE":
        return "Employee";
      case "MANAGER":
        return "Manager";
      case "SECURITY_ADMIN":
        return "Security Admin";
      case "ADMIN":
        return "Admin";
      default:
        return role;
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasChanges = Object.keys(roleChanges).length > 0;

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            bgcolor: "white",
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Role Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assign and manage user roles across the organization
              </Typography>
            </Box>
            {aiDescription && (
              <Box sx={{ flex: 1, mx: 4, p: 2, bgcolor: "#f0f9ff", borderRadius: 2, border: "1px solid #bae6fd" }}>
                <Typography variant="subtitle2" color="primary" fontWeight={600}>
                  AI Role Description:
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {aiDescription}
                </Typography>
              </Box>
            )}
            {hasChanges && (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveChanges}
                sx={{
                  bgcolor: "#2563eb",
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1d4ed8",
                    boxShadow: "none",
                  },
                }}
              >
                Save Changes ({Object.keys(roleChanges).length})
              </Button>
            )}
          </Box>

          {/* Search Bar */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search by name, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 500 }}
          />
        </Paper>

        {/* Users Table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Department
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Joined Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Current Role
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Assign Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => {
                const pendingRole = roleChanges[user.id];
                const displayRole = pendingRole || user.currentRole;

                return (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{
                      bgcolor: index % 2 === 0 ? "white" : "grey.50",
                      "&:hover": {
                        bgcolor: "#f8fafc !important",
                      },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            bgcolor: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PersonIcon fontSize="small" sx={{ color: "#2563eb" }} />
                        </Box>
                        <Typography variant="body2" fontWeight={600}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.joinedDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getRoleLabel(displayRole)}
                        size="small"
                        sx={{
                          bgcolor: `${getRoleColor(displayRole)}15`,
                          color: getRoleColor(displayRole),
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          border: pendingRole ? "1px solid" : "none",
                          borderColor: pendingRole
                            ? getRoleColor(displayRole)
                            : "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={displayRole}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        sx={{
                          minWidth: 160,
                          fontSize: "0.875rem",
                          bgcolor: pendingRole ? "#fffbeb" : "white",
                        }}
                      >
                        <MenuItem value="EMPLOYEE">Employee</MenuItem>
                        <MenuItem value="MANAGER">Manager</MenuItem>
                        <MenuItem value="SECURITY_ADMIN">Security Admin</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No users found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search query
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}