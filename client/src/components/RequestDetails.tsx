import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authenticateApprovedRequest, authenticateRequestById } from "../api/adminApi";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

interface RequestItem {
  _id: string;
  restaurantName: string;
  address: string;
  status: string;
  note: string;
  user: {
    userName: string;
    email: string;
    phoneNumber: string;
  };
}

export const RequestDetails: React.FC = () => {
  const [request, setRequest] = useState<RequestItem | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
  const [reason, setReason] = useState("");
  const { _id } = useParams<{ _id: string }>();

  useEffect(() => {
  const fetchRequest = async (id: string) => {
    try {
      const res = await authenticateRequestById(id);
      setRequest(res.data);
    } catch (error) {
      console.log("Error fetching request details:", error);
    }
  };

  if (_id) fetchRequest(_id);
}, [_id]);

// Handler to update request status
const userStatus = async (status: "PENDING" | "ACCEPTED" | "REJECTED") => {
  if (!_id) return;
  try {
    const res = await authenticateApprovedRequest(_id, status); // pass status
    setRequest(res.data);
     setOpenDialog(false);
      setReason("");
    console.log("Success")
  } catch (error) {
    console.log("Error in changing status:", error);
  }
};

  if (!request) return <p>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",

        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "red" }}>
        Request Details
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#555" }}>Restaurant Info</h3>
        <p><strong>Name:</strong> {request.restaurantName}</p>
        <p><strong>Address:</strong> {request.address}</p>
        <p><strong>Note:</strong> {request.note}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color:
                request.status === "PENDING"
                  ? "#FFA500"
                  : request.status === "ACCEPTED"
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {request.status}
          </span>
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#555" }}>User Info</h3>
        <p><strong>Name:</strong> {request.user.userName}</p>
        <p><strong>Email:</strong> {request.user.email}</p>
        <p><strong>Phone:</strong> {request.user.phoneNumber}</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="contained" color="warning"  onClick={() => userStatus("PENDING")}>Pending</Button>
        <Button variant="contained" color="success" onClick={() => userStatus("ACCEPTED")}>Approved</Button>
       <Button
  variant="contained"
  color="error"
  onClick={() => setOpenDialog(true)}
>
  Rejected
</Button>

         {/* 💬 Rejection Reason Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reject Request</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Please provide a reason for rejecting this seller request:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Rejection Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!reason.trim()) return alert("Reason is required!");
              userStatus("REJECTED");
            }}
            variant="contained"
            color="error"
          >
            Confirm Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      </div>

  );
};
