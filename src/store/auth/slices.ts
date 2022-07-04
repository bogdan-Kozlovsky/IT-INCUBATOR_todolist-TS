import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginTC } from 'store/auth/asyncThunks';

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state: any, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    });
  },
});

export const auth = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;
