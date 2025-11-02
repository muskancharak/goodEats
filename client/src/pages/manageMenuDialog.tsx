

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import { getMenuList, authenticateAddMenu } from "../api/menuItems";
import { useParams } from "react-router-dom";


interface Dish {
  _id: string;
  DishName?: string;
  description?: string;
  price: number;
  image?: string;
  name?: string;
}

interface ManageMenuDialogProps {
  open: boolean;
  onClose: () => void;
  restaurantName?: string;
  restaurantId: string; 
}

export default function ManageMenuDialog({
  open,
  onClose,
  restaurantName,
  restaurantId
}: ManageMenuDialogProps) {
  
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const [newDish, setNewDish] = useState<{
    DishName: string;
    description: string;
    price: string;
    image: File | null;
  }>({
    DishName: "",
    description: "",
    price: "",
    image: null,
  });

  // ✅ Function to fetch menu items
  const fetchMenuItems = async (id: string) => {
    try {
      setLoading(true);
      const res = await getMenuList(id);
      const menuData = res?.data?.data?.menu || res?.data?.menu || res?.data || [];
      setMenuItems(menuData);
    } catch (err) {
      console.error("Failed to load menu:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch menu when restaurantId changes
  useEffect(() => {
    if (restaurantId) fetchMenuItems(restaurantId);
  }, [restaurantId]);

  // ✅ Add new dish
  const handleAddDish = async () => {
  try {
    if (!newDish.DishName || !newDish.price || !newDish.image) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    if (!restaurantId) {
      alert("Restaurant ID not found in URL!");
      return;
    }

    await authenticateAddMenu({
      DishName: newDish.DishName,
      price: newDish.price,
      description: newDish.description,
      image: newDish.image,
      restaurantId: restaurantId as string, // ✅ type-safe cast
    });

    alert("Dish added successfully!");
    setAddDialogOpen(false);
    setNewDish({ DishName: "", description: "", price: "", image: null });

    fetchMenuItems(restaurantId); // ✅ safe refresh
  } catch (err) {
    console.error(err);
    alert("Failed to add dish");
  }
};


  return (
    <>
      {/* ===== MAIN MENU DIALOG ===== */}
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight={700}>
            🍽️ Manage Menu – {restaurantName || "Restaurant"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ minHeight: 300 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
              <CircularProgress />
            </Box>
          ) : menuItems.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              mt={3}
            >
              No menu items found for this restaurant.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {menuItems.map((dish) => (
                <Grid item xs={12} sm={6} key={dish._id}>
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 2,
                      boxShadow: 2,
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        mr: 2,
                      }}
                      image={
                        dish.image ||
                        "https://via.placeholder.com/120x100?text=No+Image"
                      }
                      alt={dish.DishName || dish.name}
                    />
                    <CardContent sx={{ flex: 1, p: 0 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {dish.DishName || dish.name || "Unnamed Dish"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ mb: 0.5 }}
                      >
                        {dish.description || "No description available."}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="primary">
                        ₹{dish.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddDialogOpen(true)}
          >
            ➕ Add Dish
          </Button>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== ADD DISH POPUP ===== */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Dish</DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="Dish Name"
              name="DishName"
              value={newDish.DishName}
              onChange={(e) => setNewDish({ ...newDish, DishName: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              value={newDish.description}
              onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newDish.price}
              onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
              fullWidth
              required
            />
            <Button
              variant="outlined"
              component="label"
              color="secondary"
              sx={{ alignSelf: "flex-start" }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setNewDish({ ...newDish, image: file });
                }}
              />
            </Button>
            {newDish.image && (
              <Typography variant="body2" color="text.secondary">
                Selected: {newDish.image.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddDialogOpen(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleAddDish} variant="contained" color="primary">
            Save Dish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
