import { Dispatch } from 'redux';

import { taskAPI } from 'api/task';
import { UpdateTaskModelType } from 'api/types';
import { AppRootStateType } from 'store/store';
import { updateTaskAC } from 'store/tasks/slices';
import { UpdateDomainTaskModelType } from 'store/tasks/types';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const updateTaskTC =
  (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    // @ts-ignore
    const task = state.tasks[todolistId].find(t => t.id === taskId);

    if (!task) {
      // throw new Error("task not found in the state");
      console.warn('task not found in the state');

      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...model,
    };

    taskAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res: { data: { resultCode: number } }) => {
        if (res.data.resultCode === 0) {
          const action = updateTaskAC({ taskId, model, todolistId });

          dispatch(action);
        } else {
          // @ts-ignore
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error: { message: string }) => {
        handleServerNetworkError(error, dispatch);
      });
  };
