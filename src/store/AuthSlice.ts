import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthModel } from '../model/AuthModel';
export enum AuthStatus {
  Init,
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
  isLoggedIn: AuthStatus.Init,
  isLogging: false,
  userAuth: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state, action) => {
      console.log('loginStart');
      state.isLogging = true;
      state.isLoggedIn = AuthStatus.Init;
      state.userAuth = action.payload;
    },
    authenticating: (state, action) => {
      console.log('authenticating');
      state.isLoggedIn = AuthStatus.Authenticating;
      state.isLogging = false;
      state.userAuth = action.payload as AuthModel;
    },
    loginSuccess: (state, action) => {
      console.log('loginSuccess');
      state.isLoggedIn = AuthStatus.LoggedIn;
      state.isLogging = false;
      state.userAuth = action.payload as AuthModel;
    },
    loginFailure: (state, action) => {
      console.log('loginFailure');
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
