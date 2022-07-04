import { setAppErrorAC, setAppStatusAC } from 'store/app/slices';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateTypeApp = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
