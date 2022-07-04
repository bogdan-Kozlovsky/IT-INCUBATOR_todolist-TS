import { Dispatch } from 'redux';

import { authAPI } from 'api/auth';
import { setAppInitializedAC } from 'store/app/slices';
import { setIsLoggedInAC } from 'store/auth/slices';

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }));
    }
    dispatch(setAppInitializedAC({ isInitialized: true }));
  });
};
