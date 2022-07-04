import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { authAPI } from 'api/auth';
import { FieldErrorType, LoginParamsType } from 'api/types';
import { setAppStatusAC } from 'store/app/slices';
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
