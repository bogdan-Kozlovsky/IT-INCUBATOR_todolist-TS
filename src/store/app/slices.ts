import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialStateTypeApp, RequestStatusType } from 'store/app/types';

export const initialState: InitialStateTypeApp = {
  status: 'idle',
  error: null,
  isInitialized: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppErrorAC(
      state: InitialStateTypeApp,
      action: PayloadAction<{ error: string | null }>,
    ) {
      state.error = action.payload.error;
    },
    setAppStatusAC(
      state: InitialStateTypeApp,
      action: PayloadAction<{ status: RequestStatusType }>,
    ) {
      state.status = action.payload.status;
    },
    setAppInitializedAC(
      state: InitialStateTypeApp,
      action: PayloadAction<{ isInitialized: boolean }>,
    ) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const app = slice.reducer;
export const { setAppErrorAC, setAppStatusAC, setAppInitializedAC } = slice.actions;
