// src/App.tsx

import { useMemo, useState } from 'react';

import CartDrawer from '../../components/CartDrawer';
import Footer from '../../components/Footer';
import Navbar from '../../components/navBar';
import ProductList from '../../components/ProductList';
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

const allProducts: Product[] = [
  {
    id: 1,
    title: 'Smartphone',
    description: 'Latest model smartphone',
    price: 699,
    category: 'Electronics',
    image: `https://picsum.photos/200/200?random=1`,
  },
  {
    id: 2,
    title: 'Running Shoes',
    description: 'Comfortable running shoes',
    price: 120,
    category: 'Footwear',
    image: `https://picsum.photos/200/200?random=2`,
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker',
    price: 59,
    category: 'Electronics',
    image: `https://picsum.photos/200/200?random=3`,
  },
  {
    id: 4,
    title: 'T-Shirt',
    description: 'Casual cotton t-shirt',
    price: 25,
    category: 'Clothing',
    image: `https://picsum.photos/200/200?random=4`,
  },
  {
    id: 1,
    title: 'Smartphone',
    description: 'Latest model smartphone',
    price: 699,
    category: 'Electronics',
    image: `https://picsum.photos/200/200?random=5`,
  },
  {
    id: 2,
    title: 'Running Shoes',
    description: 'Comfortable running shoes',
    price: 120,
    category: 'Footwear',
    image: `https://picsum.photos/200/200?random=6`,
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker',
    price: 59,
    category: 'Electronics',
    image: `https://picsum.photos/200/200?random=7`,
  },
  {
    id: 4,
    title: 'T-Shirt',
    description: 'Casual cotton t-shirt',
    price: 25,
    category: 'Clothing',
    image: `https://picsum.photos/200/200?random=8`,
  },
];

function App() {
   const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

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

  const cartCount = cart.length;

  return (
    <div className={styles.app}>
      <Navbar
        search={search}
        setSearch={setSearch}
        categories={categories}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onLogout={()=>{navigate('/login')}}
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
