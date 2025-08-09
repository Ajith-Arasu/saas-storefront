import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './Navbar.module.css';

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
  categories: string[];
  filterCategory: string | null;
  setFilterCategory: (cat: string | null) => void;
  cartCount: number;
  onCartOpen: () => void;
  onLogout: () => void; // new prop for logout handler
}

const Navbar: React.FC<NavbarProps> = ({
  search,
  setSearch,
  categories,
  filterCategory,
  setFilterCategory,
  cartCount,
  onCartOpen,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (cat: string | null) => {
    setFilterCategory(cat);
    closeMenu();
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>

        <Box className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <InputBase
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
            className={styles.searchInput}
          />
        </Box>

        <IconButton
          color={filterCategory ? 'secondary' : 'inherit'}
          onClick={openMenu}
          aria-controls="filter-menu"
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          sx={{ ml: 1 }}
          size="large"
        >
          <FilterListIcon />
        </IconButton>

        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem
            selected={filterCategory === null}
            onClick={() => handleCategorySelect(null)}
          >
            All Categories
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem
              key={cat}
              selected={filterCategory === cat}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </MenuItem>
          ))}
        </Menu>

        <IconButton
          aria-label="cart"
          color="inherit"
          onClick={onCartOpen}
          size="large"
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Logout Button */}
        <Button color="inherit" onClick={onLogout} sx={{ ml: 2 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
