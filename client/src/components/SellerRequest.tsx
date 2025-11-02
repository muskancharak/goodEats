import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { sendSellerRequest } from "../api/sellerRequest";

// Define type for form data sent to backend
interface NewSellerRequest {
  restaurantName: string;
  address: string;
  note: string;
}

const SellerRequestForm: React.FC = () => {
  const [form, setForm] = useState<NewSellerRequest>({
    restaurantName: "",
    address: "",
    note: ""
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit seller request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.restaurantName || !form.address || !form.note) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await sendSellerRequest(form); // send only form fields
      alert("Request sent successfully!");
      console.log("Response:", res);

      // Reset form
      setForm({ restaurantName: "", address: "", note: "" });
    } catch (err: any) {
      console.error("Error sending request:", err);
      alert(err.response?.data?.message || err.message || "Failed to send request");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "linear-gradient(135deg, #fdf6e3, #ffe8b2)"
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Apply to Become a Seller
      </Typography>

      <TextField
        label="Restaurant Name"
        name="restaurantName"
        value={form.restaurantName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Restaurant Address"
        name="address"
        value={form.address}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Note / Purpose"
        name="note"
        value={form.note}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Send Request
      </Button>
    </Box>
  );
};

export default SellerRequestForm;
