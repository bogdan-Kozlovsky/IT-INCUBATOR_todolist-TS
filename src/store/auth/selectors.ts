import { AppRootStateType } from 'store/store';

export const selectIsLoggedIn = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn;
