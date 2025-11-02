import React from "react";
import { Box, Typography, Button, Card, CardContent, Stack } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addToCart, removeFromCart } from "../redux/cartSlice"; // ✅ both actions

const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  // ✅ calculate total dynamically
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
        🛒 Your Cart
      </Typography>

      {/* Cart Items Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Card key={item.id} sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{item.price * item.quantity}
                </Typography>

                {/* ✅ Quantity Control Section */}
                <Stack direction="row" alignItems="center" spacing={2} mt={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    ➖
                  </Button>

                  <Typography variant="body1">{item.quantity}</Typography>

                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                        })
                      )
                    }
                  >
                    ➕
                  </Button>
                </Stack>

                {/* Remove completely */}
                {/* <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => dispatch(removeFromCart({ id: item.id, name: item.name, price: item.price, quantity: item.quantity }))}
                >
                  Remove Item
                </Button> */}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography textAlign="center">Your cart is empty 🛒</Typography>
        )}
      </Box>

      {/* ✅ Total Section */}
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Total: ₹{totalAmount}</Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
