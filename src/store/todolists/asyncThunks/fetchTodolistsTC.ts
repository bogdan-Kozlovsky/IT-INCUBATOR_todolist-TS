import { Dispatch } from 'redux';

import { todolistsAPI } from 'api/todolist';
import { setAppStatusAC } from 'store/app/slices';
import { setTodolistsAC } from 'store/todolists/slices';
import { handleServerNetworkError } from 'utils/error-utils';

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistsAPI
      .getTodolists()
      .then((res: { data: any }) => {
        dispatch(setTodolistsAC({ todolists: res.data }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      })
      .catch((error: any) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
