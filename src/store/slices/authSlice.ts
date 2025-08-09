import { createSlice } from '@reduxjs/toolkit';

// User type
interface User {
  id: string;
  name: string;
  email: string;
}

// Auth state
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
