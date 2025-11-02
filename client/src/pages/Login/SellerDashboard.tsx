
// src/pages/SellerDashboard.tsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   CardActions,
//   CircularProgress,
// } from "@mui/material";
// import AddRestaurantDialog from "../../components/AddRestaurantDialog";
// import { authenticateAddRestro, getSellerRestaurants } from "../../api/sellerRequest";

// interface Restaurant {
//   _id: string;
//   RestroName: string;
//   location: string;
//   description: string;
//   image?: string;
// }

// export default function SellerDashboard() {
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch seller's restaurants
//   const fetchRestaurants = async () => {
//     setLoading(true);
//     try {
//       const data = await getSellerRestaurants();
//       setRestaurants(data?.data?.restro || []);
//       console.log("data",data)
//     } catch (err) {
//       console.error("Error fetching restaurants:", err);
//       setRestaurants([]); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add restaurant handler
//   const handleAddRestaurant = async (formValues: {
//     RestroName: string;
//     location: string;
//     description: string;
//     image: File;
//   }) => {
//     try {
//       const res = await authenticateAddRestro(formValues);
//       console.log("New restaurant added:", res);
//       await fetchRestaurants(); // refresh after adding
//       setOpenDialog(false); // close modal after success
//     } catch (err) {
//       console.error("Error adding restaurant:", err);
//     }
//   };

//   // ✅ Handle clicking on restaurant card
//   const handleRestaurantClick = (id: string) => {
//     console.log("Restaurant ID clicked:", id);
//     alert(`Restaurant ID: ${id}`);
//     // later you can navigate(`/seller/restaurants/${id}`);
//   };

//   // ✅ Initial load
//   useEffect(() => {
//     fetchRestaurants();
//   }, []);


//   return (
//     <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
//       <Typography variant="h4" fontWeight={700} gutterBottom>
//         Seller Dashboard
//       </Typography>
//       <Typography variant="subtitle1" color="text.secondary" mb={3}>
//         Manage your restaurants here
//       </Typography>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setOpenDialog(true)}
//         sx={{ mb: 4 }}
//       >
//         Add New Restaurant
//       </Button>

//       {/* ✅ Loader */}
//       {loading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
//           <CircularProgress />
//         </Box>
//       ) : restaurants.length === 0 ? (
//         <Typography>No restaurants found.</Typography>
//       ) : (

// <Grid container spacing={3}>
//   {restaurants.map((rest) => (
//     <Grid item xs={12} sm={6} md={4} key={rest._id}>
//       <Card
//         sx={{
//           borderRadius: 2,
//           boxShadow: 3,
//           cursor: "pointer",
//           "&:hover": { boxShadow: 6 },
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//         onClick={() => handleRestaurantClick(rest._id)}
//       >
//         {/* ✅ Image on top */}
//         <img
//           src={rest.image}
//           alt={rest.RestroName || "Restaurant"}
//           style={{
//             width: "100%",
//             height: 180,
//             objectFit: "cover",
//           }}
//         />

//         {/* ✅ Restaurant Name + Description */}
//         <CardContent
//           sx={{
//             textAlign: "center",
//             padding: "12px 16px",
//           }}
//         >
//           <Typography variant="h6" fontWeight={600}>
//             {rest.RestroName}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {rest.location}
//           </Typography>
//           <Typography variant="body2" mt={1}>
//             {rest.description}
//           </Typography>
//         </CardContent>

//         {/* ✅ View Details Button */}
//         <CardActions sx={{ justifyContent: "center", marginBottom: 1 }}>
//           <Button
//             size="small"
//             color="secondary"
//             onClick={(e) => {
//               e.stopPropagation(); // prevent parent click
//               handleRestaurantClick(rest._id);
//             }}
//           >
//             View Details
//           </Button>
//         </CardActions>
//       </Card>
//     </Grid>
//   ))}
// </Grid>
//       )}

//       {/* ✅ Add Restaurant Modal */}
//       <AddRestaurantDialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         onAdd={handleAddRestaurant}
//       />
//     </Box>
//   );
// }


// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   CardActions,
// } from "@mui/material";
// import AddRestaurantDialog from "../../components/AddRestaurantDialog";
// import { authenticateAddRestro, getSellerRestaurants } from "../../api/sellerRequest";
// import ManageMenuDialog from "../manageMenuDialog";
// import { useNavigate } from "react-router-dom";


// interface Restaurant {
//   _id: string;
//   RestroName: string;
//   location: string;
//   description: string;
//   image?: string;
// }

// export default function SellerDashboard() {
//   const navigate = useNavigate();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
//   const [loading ,setLoading] = useState(false);
//   const [restaurant , setRestaurants] = useState<Restaurant[]>([])

//  //   // ✅ Fetch seller's restaurants

//   const fetchRestaurants = async () => {
//     setLoading(true);
//     try {
//       const data = await getSellerRestaurants();
//       setRestaurants(data?.data?.restro || []);
//       console.log("data",data)
//     } catch (err) {
//       console.error("Error fetching restaurants:", err);
//       setRestaurants([]); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add restaurant handler
//   const handleAddRestaurant = async (formValues: {
//     RestroName: string;
//     location: string;
//     description: string;
//     image: File;
//   }) => {
//     try {
//       const res = await authenticateAddRestro(formValues);
//       console.log("New restaurant added:", res);
//       await fetchRestaurants(); // refresh after adding
//       setOpenDialog(false); // close modal after success
//     } catch (err) {
//       console.error("Error adding restaurant:", err);
//     }
//   };

//   // ✅ Handle clicking on restaurant card
//   const handleviewDetails = (id: string) => {
//     console.log("Restaurant ID clicked:", id);
//     alert(`Restaurant ID: ${id}`);
//     // later you can navigate(`/seller/restaurants/${id}`);
//   };

//   useEffect(() => {
//     fetchRestaurants();
//   }, []);


//   return (
//     <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
//       <Typography variant="h4" fontWeight={700} gutterBottom>
//         Seller Dashboard
//       </Typography>
//       <Typography variant="subtitle1" color="text.secondary" mb={3}>
//         Manage your restaurants here
//       </Typography>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setOpenDialog(true)}
//         sx={{ mb: 4 }}
//       >
//         Add New Restaurant
//       </Button>

//       {/* ✅ Restaurant Cards */}
//       <Grid container spacing={3}>
//         {restaurant.map((rest) => (
//           <Grid item xs={12} sm={6} md={4} key={rest._id}>
//             <Card
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 overflow: "hidden",
//                 "&:hover": { boxShadow: 6 },
//               }}
//             >
//               <img
//                 src={rest.image}
//                 alt={rest.RestroName}
//                 style={{ width: "100%", height: 180, objectFit: "cover" }}
//               />
//               <CardContent>
//                 <Typography variant="h6">{rest.RestroName}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {rest.location}
//                 </Typography>
//                 <Typography variant="body2" mt={1}>
//                   {rest.description}
//                 </Typography>
//               </CardContent>
//               <CardActions sx={{ justifyContent: "space-between" }}>
//                 <Button
//                   size="small"
//                   color="secondary"
//                   onClick={() => setSelectedRestaurant(rest)}
//                 >
//                   Manage Menu
//                 </Button>
//               <Button onClick={() => navigate(`/restaurant/${rest._id}/menu`)}>View Menu</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Add Restaurant Modal (static placeholder) */}
//       <AddRestaurantDialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         onAdd={() => setOpenDialog(false)}
//       />

//       {/* Manage Menu Dialog */}
//       {selectedRestaurant && (
//         <ManageMenuDialog
//           open={!!selectedRestaurant}
//           onClose={() => setSelectedRestaurant(null)}
//           restaurant={selectedRestaurant}
//         />
//       )}
//     </Box>
//   );
// }


// src/pages/SellerDashboard.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  CircularProgress,
} from "@mui/material";
import AddRestaurantDialog from "../../components/AddRestaurantDialog";
import { authenticateAddRestro, getSellerRestaurants } from "../../api/sellerRequest";
import ManageMenuDialog from "../manageMenuDialog";
import { useNavigate } from "react-router-dom";

// Define Restaurant type
interface Restaurant {
  _id: string;
  RestroName: string;
  location: string;
  description: string;
  image?: string;
}

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // ✅ Fetch seller's restaurants
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

  // ✅ Add restaurant handler
  const handleAddRestaurant = async (formValues: {
    RestroName: string;
    location: string;
    description: string;
    image: File;
  }) => {
    try {
      const res = await authenticateAddRestro(formValues);
      console.log("New restaurant added:", res);
      await fetchRestaurants(); // refresh list
      setOpenDialog(false); // close modal
    } catch (err) {
      console.error("Error adding restaurant:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Seller Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Manage your restaurants here
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 4 }}
      >
        Add New Restaurant
      </Button>

      {/* ✅ Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : restaurants.length === 0 ? (
        <Typography>No restaurants found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {restaurants.map((rest) => (
            <Grid item xs={12} sm={6} md={4} key={rest._id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  overflow: "hidden",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <img
                  src={rest.image}
                  alt={rest.RestroName}
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{rest.RestroName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {rest.location}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {rest.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => setSelectedRestaurant(rest)}
                  >
                    Manage Menu
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/restaurant/${rest._id}/menu`)}
                  >
                    View Menu
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ✅ Add Restaurant Modal */}
      <AddRestaurantDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddRestaurant} // ✅ Correct handler
      />

      {/* ✅ Manage Menu Dialog */}
      {selectedRestaurant && (
        <ManageMenuDialog
          open={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          restaurantId={selectedRestaurant._id} // ✅ pass correct ID
          restaurantName={selectedRestaurant.RestroName} // ✅ optional if dialog expects name
        />
      )}
    </Box>
  );
}
