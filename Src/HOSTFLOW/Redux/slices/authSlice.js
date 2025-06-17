import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userType: null, // 'user', 'host', 'artist'
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userType = 'user';
      state.userData = action.payload;
    },
    loginHost: (state, action) => {
      state.isLoggedIn = true;
      state.userType = 'host';
      state.userData = action.payload;
    },
    loginArtist: (state, action) => {
      state.isLoggedIn = true;
      state.userType = 'artist';
      state.userData = action.payload;
    },
    logout: (state) => {
      // Completely reset to initial state - no previous login traces
      return initialState;
    },
  },
});

export const { loginUser, loginHost, loginArtist, logout } = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserType = (state) => state.auth.userType;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer; 