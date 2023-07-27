import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import emailVerificationReducer from './EmailVerificationSlice';

function loadState() {
  try {
    const serializedState = localStorage.getItem('lastSend');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}
function saveState(state : object) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('lastSend', serializedState);
  } catch {
    // ignore write errors
  }
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    emailVerification: emailVerificationReducer,
  },

  preloadedState: {
    emailVerification: {
      lastSend: loadState(),
    },
  },
},
);
store.subscribe(() => {
  saveState(store.getState().emailVerification.lastSend);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;