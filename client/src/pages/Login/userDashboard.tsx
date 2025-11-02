import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { getSellerRestaurants } from "../../api/sellerRequest";
import { useNavigate } from "react-router-dom";

// Define the type for a restaurant object
interface Restaurant {
  _id: string;
  RestroName: string;
  address?: string;
  description?: string;
  image?: string;
}

const UserDashboard: React.FC = () => {
    const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch restaurants (replace mock API with your actual API)
  const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const data = await getSellerRestaurants();
        setRestaurants(data?.data?.restro || []);
        console.log("Fetched restaurants:", data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleViewMenu = (restaurantId: string): void => {
    navigate(`/restaurant/${restaurantId}/menu`);

  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        🍴 Explore Restaurants
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {restaurants.length > 0 ? (
          restaurants.map((restro) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restro._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    restro.image ||
                    "https://via.placeholder.com/400x200?text=Restaurant"
                  }
                  alt={restro.RestroName}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {restro.RestroName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {restro.address || "No address provided"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {restro.description ||
                      "Delicious food and great ambiance!"}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      backgroundColor: "#ff7043",
                      "&:hover": { backgroundColor: "#ff5722" },
                      borderRadius: 2,
                    }}
                    onClick={() => handleViewMenu(restro._id)}
                  >
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography textAlign="center" color="text.secondary">
            No restaurants found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default UserDashboard;
