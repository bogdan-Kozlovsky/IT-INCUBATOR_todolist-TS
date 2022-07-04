import { Dispatch } from 'redux';

import { authAPI } from 'api/auth';
import { setAppStatusAC } from 'store/app/slices';
import { setIsLoggedInAC } from 'store/auth/slices';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  authAPI
    .logout()
    .then((res: { data: { resultCode: number } }) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        // @ts-ignore
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error: { message: string }) => {
      handleServerNetworkError(error, dispatch);
    });
};
