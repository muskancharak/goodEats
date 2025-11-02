// import React, { useState,useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import { getMenuList } from "../api/menuItems";
// import { useAppDispatch } from "../redux/hooks";
// import { addToCart } from "../redux/cartSlice";

// interface Dish {
//   _id: string;
//   DishName?: string;
//   description?: string;
//   price: number;
//   image?: string;
//   name?: string;
// }

// const RestaurantMenuPage: React.FC = () => {
//   const { restaurantId } = useParams<{ restaurantId: string }>();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [menuItems, setMenuItems] = useState<Dish[]>([]);

// const dispatch = useAppDispatch();


//    const fetchMenuItems = async (restaurantId: any) => {
//       try {
//         setLoading(true);
//         const res = await getMenuList(restaurantId);
//         const menuData = res?.data?.data?.menu || res?.data?.menu || res?.data || [];
//         setMenuItems(menuData);
//       } catch (err) {
//         console.error("Failed to load menu:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//     if (restaurantId) {
//       fetchMenuItems(restaurantId);
//     }
//   }, [restaurantId]);


//   return (
//     <Box p={3}>
//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
//         ← Back to Restaurants
//       </Button>
//       <Typography variant="h4" gutterBottom fontWeight={600}>
//         🍽 Menu
//       </Typography>

//       {menuItems.length > 0 ? (
//         menuItems.map((item) => (
//           <Card key={item._id} sx={{ mb: 2, display: "flex", borderRadius: 2 }}>
//             <CardMedia
//               component="img"
//               sx={{ width: 150 }}
//               image={item.image}
//               alt={item.DishName}
//             />
//             <CardContent>
//               <Typography variant="h6">{item.DishName}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {item.description}
//               </Typography>
//               <Typography variant="body1" fontWeight={600}>
//                 ₹{item.price}
//               </Typography>
//               <Button
//   variant="contained"
//   color="primary"
//   onClick={() =>
//     dispatch(
//       addToCart({
//         id: item._id,
//         name: item.DishName,
//         price: item.price,
//         quantity: 1,
//       })
//     )
//   }
// >
//   Add to Cart
// </Button>

//             </CardContent>
//           </Card>
//         ))
//       ) : (
//         <Typography>No menu items found for this restaurant.</Typography>
//       )}
//     </Box>
//   );
// };

// export default RestaurantMenuPage;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuList } from "../api/menuItems";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";

interface Dish {
  _id: string;
  DishName: string;
  description?: string;
  price: number;
  image?: string;
}

const RestaurantMenuPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<Dish[]>([]);

  const dispatch = useAppDispatch();

  // ✅ Fetch menu items
  const fetchMenuItems = async (restaurantId: string) => {
    try {
      setLoading(true);
      const res = await getMenuList(restaurantId);
      const menuData =
        res?.data?.data?.menu || res?.data?.menu || res?.data || [];
      setMenuItems(menuData);
    } catch (err) {
      console.error("Failed to load menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems(restaurantId);
    }
  }, [restaurantId]);

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back to Restaurants
      </Button>

      <Typography variant="h4" gutterBottom fontWeight={600}>
        🍽 Menu
      </Typography>

      {loading ? (
        <Typography>Loading menu...</Typography>
      ) : menuItems.length > 0 ? (
        menuItems.map((item) => (
          <Card
            key={item._id}
            sx={{
              mb: 2,
              display: "flex",
              borderRadius: 2,
              boxShadow: 2,
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 150, height: 120, objectFit: "cover" }}
              image={item.image || "/placeholder.jpg"}
              alt={item.DishName}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.DishName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description || "No description available."}
              </Typography>
              <Typography variant="body1" fontWeight={600} mt={1}>
                ₹{item.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1, borderRadius: 2 }}
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: item._id,
                      name: item.DishName,
                      price: item.price,
                      quantity: 1,
                    })
                  );
                  alert(`${item.DishName} added to cart!`);
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No menu items found for this restaurant.</Typography>
      )}
      <Button
  variant="contained"
  color="success"
  sx={{
    position: "fixed",
    bottom: 20,
    right: 20,
    borderRadius: "50px",
    fontWeight: "bold",
  }}
  onClick={() => navigate("/cart")}
>
  🛒 View Cart
</Button>

    </Box>
    
  );
};

export default RestaurantMenuPage;
