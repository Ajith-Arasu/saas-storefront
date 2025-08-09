// src/components/Footer.tsx

import { Box, Typography } from '@mui/material';

import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <Box component="footer" className={styles.footer}>
    <Typography variant="body2" color="textSecondary">
      © {new Date().getFullYear()} My E-Commerce App. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
