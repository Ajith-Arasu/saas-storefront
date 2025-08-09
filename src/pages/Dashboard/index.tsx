// src/App.tsx

import { useEffect, useMemo, useState } from 'react';

import CartDrawer from '../../components/CartDrawer';
import Footer from '../../components/Footer';
import Navbar from '../../components/navBar';
import ProductList from '../../components/ProductList';
import { allProducts } from '../../utils/const';
import { deleteCookie } from '../../utils/cookies';
import styles from './App.module.css';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

function App() {
  const navigate = useNavigate();

  // Immediate input value controlled by user typing
  const [searchInput, setSearchInput] = useState('');

  // Debounced search term used for filtering
  const [search, setSearch] = useState('');

  // Debounce effect to update search state after 300ms idle time
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = filterCategory
        ? p.category === filterCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, filterCategory]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleLogout = () => {
    deleteCookie('login');
    navigate('/login');
  };

  const cartCount = cart.length;

  return (
    <div className={styles.app}>
      <Navbar
        search={searchInput} // pass immediate input for controlled input
        setSearch={setSearchInput} // update immediate input on typing
        categories={categories}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onLogout={handleLogout}
      />
      <main className={styles.content}>
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      </main>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
      />
      <Footer />
    </div>
  );
}

export default App;
