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
    }
};
