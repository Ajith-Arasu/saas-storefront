// src/components/CartDrawer.tsx

import {
  Box,
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
import styles from './CartDrawer.module.css';

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
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        <Divider />
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
            <Typography variant="subtitle1" className={styles.total}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
