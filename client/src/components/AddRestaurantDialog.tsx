// src/components/AddRestaurantDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { authenticateAddRestro } from "../api/sellerRequest";

interface AddRestaurantDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd?: () => void; // optional, only if you're using it
}

export default function AddRestaurantDialog({
  open,
  onClose,
  onAdd,
}: AddRestaurantDialogProps) {
  const [restaurant, setRestaurant] = useState<{
  RestroName: string;
  location: string;
  description: string;
  image: File | null;
}>({
  RestroName: "",
  location: "",
  description: "",
  image: null,
});



  const [preview, setPreview] = useState<string | null>(null);

  // Handle Image Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // the '?' handles the null case safely
  if (file) {
    setRestaurant({ ...restaurant, image: file });
    setPreview(URL.createObjectURL(file)); // optional image preview
  }
};


  // Submit restaurant details
  const handleSubmit = async () => {
    if (restaurant.RestroName && restaurant.location && restaurant.image) {
      const formValues = {
        RestroName: restaurant.RestroName,
        image: restaurant.image,
        location: restaurant.location,
        description: restaurant.description,
      };

      try {
        const res = await authenticateAddRestro(formValues);
        console.log("Restaurant added:", res);
        alert("Restaurant added successfully!");

        // ✅ reset form and close dialog
        setRestaurant({ RestroName: "", location: "", description: "", image: null });
        setPreview(null);
        onClose();
      } catch (err) {
        console.error("Add restaurant error:", err);
        alert("Failed to add restaurant.");
      }
    } else {
      alert("Please fill all fields and select an image.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Restaurant</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Restaurant Name"
            variant="outlined"
            fullWidth
            value={restaurant.RestroName}
            onChange={(e) =>
              setRestaurant({ ...restaurant, RestroName: e.target.value })
            }
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={restaurant.location}
            onChange={(e) =>
              setRestaurant({ ...restaurant, location: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={restaurant.description}
            onChange={(e) =>
              setRestaurant({ ...restaurant, description: e.target.value })
            }
          />

          {/* Image Upload */}
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Upload Restaurant Image
            </Typography>
            <Button variant="outlined" component="label">
              Choose File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {/* ✅ Show file name */}
            {restaurant.image && (
              <Typography mt={1} variant="body2" color="text.secondary">
                Selected File: {restaurant.image.name}
              </Typography>
            )}

            {/* ✅ Show preview */}
            {preview && (
              <Box mt={2} textAlign="center">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
