import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthModel } from '../model/AuthModel';
export enum AuthStatus {
  NotLoggedIn,
  Authenticating,
  LoggedIn,
}

interface AuthState {
  isLoggedIn: AuthStatus;
  isLogging: boolean;
  userAuth: AuthModel;
}

const initialState: AuthState = {
  isLoggedIn: AuthStatus.NotLoggedIn,
  isLogging: false,
  userAuth: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.isLogging = true;
      state.isLoggedIn = AuthStatus.NotLoggedIn;
      state.userAuth = action.payload;
    },
    authenticating: (state, action) => {
      state.isLoggedIn = AuthStatus.Authenticating;
      state.isLogging = false;
      state.userAuth = action.payload as AuthModel;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = AuthStatus.LoggedIn;
      state.isLogging = false;
      state.userAuth = action.payload as AuthModel;
    },
    loginFailure: (state, action) => {
      state.isLogging = false;
      state.isLoggedIn = AuthStatus.NotLoggedIn;
      state.userAuth = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = AuthStatus.NotLoggedIn;
      state.userAuth = action.payload;
    },
    updateAuthUser:(state, action) => {
      state.userAuth = action.payload;
    },
  },
});

export const { loginStart, authenticating, loginSuccess, loginFailure, logout, updateAuthUser } = authSlice.actions;

export default authSlice.reducer;
