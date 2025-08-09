// src/App.tsx
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

// import CheckoutPage from "./pages/Checkout/CheckoutPage";
import DashboardPage from "./pages/Dashboard";
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import SignupPage from './pages/SignupPage';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />

          {/* Protected routes (for simplicity, using a fake wrapper now) */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
