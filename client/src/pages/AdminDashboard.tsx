import React, { useEffect, useState } from "react";
import {
  authenticateGetAllRequest,
  authenticateRequestById,
} from "../api/adminApi";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface RequestItem {
  _id: string;
  restaurantName: string;
  status: string;
  note: string;
  user: {
    userName: string;
    email: string;
  };
}

interface UserItem {
  _id: string;
  userName: string;
  email: string;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [newUsers, setNewUsers] = useState<UserItem[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  // Fetch all requests
  const getAllRequest = async () => {
    try {
      const res = await authenticateGetAllRequest();
      setRequests(res.data);
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  // Fetch new users
  const getNewUsers = async () => {
    try {
      const res = await fetch("/api/admin/new-users");
      const data = await res.json();
      setNewUsers(data);
    } catch (error) {
      console.log("Error fetching new users:", error);
    }
  };

  // Fetch request by ID when clicked
  const handleViewRequest = async (_id: string) => {
    try {
      const res = await authenticateRequestById(_id);
      setSelectedRequest(res);
    } catch (error) {
      console.log("Error fetching request details:", error);
    }
  };

  useEffect(() => {
    getAllRequest();
    getNewUsers();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f2f5",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT SIDE - Requests */}
      <div
        style={{
          width: "50%",
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#fff",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Pending Requests</h2>

        {requests.length === 0 ? (
          <p style={{ color: "#777" }}>No requests found</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {requests.map((req) => (
              <li
                key={req._id}
                onClick={() => handleViewRequest(req._id)}
                style={{
                  background: "#fafafa",
                  padding: "15px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                }}
              >
                <strong>{req.user.userName}</strong> — {req.user.email}
                <br />
                <span style={{ color: "#555" }}>{req.restaurantName}</span> —{" "}
                <span
                  style={{
                    color:
                      req.status === "PENDING"
                        ? "#FFA500"
                        : req.status === "ACCEPTED"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {req.status}
                  <Button variant="contained" onClick={() => navigate(`/admin/request/${req._id}`)}>view</Button>
                </span>
              </li>
            ))}
          </ul>
          
        )}
      </div>
        {/* NEW USERS BELOW */}
        <h2 style={{ margin: "30px 0 20px 0", color: "#333" }}>New Users</h2>
        {newUsers.length === 0 ? (
          <p style={{ color: "#777" }}>No new users found</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {newUsers.map((user) => (
              <li
                key={user._id}
                style={{
                  background: "#fff",
                  padding: "15px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <strong>{user.userName}</strong> — {user.email}
                <br />
                <span style={{ color: "#555" }}>
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    
  );
};
