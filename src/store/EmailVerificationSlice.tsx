import { createSlice } from '@reduxjs/toolkit';

const emailVerificationSlice = createSlice({
  name: 'emailVerification',
  initialState: {
    lastSend: null,
  },
  reducers: {
    setLastSend: (state, action) => {
      state.lastSend = action.payload;
    },
  },
});

export const { setLastSend } = emailVerificationSlice.actions;

export default emailVerificationSlice.reducer;
