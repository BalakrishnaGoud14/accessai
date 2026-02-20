// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const getHeaders = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    const user = JSON.parse(localStorage.getItem("accessai_user"));
    // If we had a JWT, we would add it here: headers["Authorization"] = `Bearer ${user.token}`;
    return headers;
};

export const api = {
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    getUsers: async () => {
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: getHeaders(),
        });
        return response.json();
    },

    updateUserRole: async (userId, role) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/role`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({ role }),
        });
        return response.json();
    },

    getAiDescription: async (prompt) => {
        const response = await fetch(`${API_BASE_URL}/ai/description`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ prompt }),
        });
        return response.json();
    },

    getRoleDescription: async (role) => {
        const response = await fetch(`${API_BASE_URL}/ai/role-description?role=${role}`, {
            headers: getHeaders(),
        });
        return response.json();
    },

    submitAccessRequest: async (userId, applicationName, justification) => {
        const response = await fetch(`${API_BASE_URL}/requests`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ userId, applicationName, justification }),
        });
        return response.json();
    },

    getPendingRequests: async () => {
        // Default for Managers (PENDING_MANAGER)
        const response = await fetch(`${API_BASE_URL}/requests/pending`, {
            headers: getHeaders(),
        });
        return response.json();
    },

    getSecurityPendingRequests: async () => {
        // For Security Admins (PENDING_SECURITY)
        const response = await fetch(`${API_BASE_URL}/requests/pending-security`, {
            headers: getHeaders(),
        });
        return response.json();
    },

    updateRequestStatus: async (requestId, status, reviewerRole, reviewerId, rejectionReason) => {
        const body = { status, reviewerRole, reviewerId };
        if (rejectionReason) {
            body.rejectionReason = rejectionReason;
        }
        const response = await fetch(`${API_BASE_URL}/requests/${requestId}/status`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return response.json();
    },

    getUserRequests: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/requests/user/${userId}`, {
            headers: getHeaders(),
        });
        return response.json();
    },

    getAuditLogs: async () => {
        const response = await fetch(`${API_BASE_URL}/audit-logs`, {
            headers: getHeaders(),
        });
        return response.json();
    },

    getAllRequests: async (role, userId) => {
        let url = `${API_BASE_URL}/requests/history`;
        if (role && userId) {
            url += `?role=${role}&userId=${userId}`;
        }
        const response = await fetch(url, {
            headers: getHeaders(),
        });
        return response.json();
    }
};
