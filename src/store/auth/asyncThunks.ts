import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { authAPI } from 'api/auth';
import { FieldErrorType, LoginParamsType } from 'api/types';
import { setAppStatusAC } from 'store/app/slices';
import { setIsLoggedInAC } from 'store/auth/slices';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const loginTC = createAsyncThunk<
  { isLoggedIn: boolean },
  LoginParamsType,
  { rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> } }
>('auth/login', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
  try {
    const res = await authAPI.login(param);

    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));

      return { isLoggedIn: true };
    }
    handleServerAppError(res.data, thunkAPI.dispatch);

    return thunkAPI.rejectWithValue({
      errors: res.data.messages,
      fieldsErrors: res.data.fieldsErrors,
    });
  } catch (err) {
    // @ts-ignore
    const error: AxiosError = err;

    handleServerNetworkError(error, thunkAPI.dispatch);

    return thunkAPI.rejectWithValue({
      errors: [error.message],
      fieldsErrors: undefined,
    });
  }
});

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
