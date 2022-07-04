import { Dispatch } from 'redux';

import { taskAPI } from 'api/task';
import { setAppStatusAC } from 'store/app/slices';
import { addTaskAC } from 'store/tasks/slices';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  taskAPI
    .createTask(todolistId, title)
    .then((res: { data: { resultCode: number; data: { item: any } } }) => {
      if (res.data.resultCode === 0) {
        const task = res.data.data.item;
        const action = addTaskAC(task);

        dispatch(action);
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
