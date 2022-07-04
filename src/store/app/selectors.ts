import { RequestStatusType } from 'store/app/types';
import { AppRootStateType } from 'store/store';

export const selectStatus = (state: AppRootStateType): RequestStatusType =>
  state.app.status;

export const selectIsInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;
