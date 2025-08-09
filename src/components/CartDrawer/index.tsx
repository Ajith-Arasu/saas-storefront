// src/components/CartDrawer.tsx

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: any[];
  onRemove: (productId: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  cartItems,
  onRemove,
}) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 350,
          height: '100vh', // full height of viewport
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        <Divider />

        {/* This box will hold the scrollable list and message */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 1 }}>
          {cartItems.length === 0 && (
            <Typography sx={{ mt: 2 }}>Your cart is empty.</Typography>
          )}

          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onRemove(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.title}
                  secondary={`$${item.price.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>

          {cartItems.length > 0 && (
            <>
              <Divider />
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Total: ${totalPrice.toFixed(2)}
              </Typography>
            </>
          )}
        </Box>

        {/* Purchase button container */}
        <Box sx={{ mt: 2 }}>
          <Button size="small" variant="contained" fullWidth>
            PURCHASE ITEMS
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
