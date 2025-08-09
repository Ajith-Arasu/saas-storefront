import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './route/ProtectedRoute';
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

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirects to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
