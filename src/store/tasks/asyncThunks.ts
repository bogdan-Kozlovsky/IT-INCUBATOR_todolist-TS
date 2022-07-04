import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { taskAPI } from 'api/task';
import { UpdateTaskModelType } from 'api/types';
import { setAppStatusAC } from 'store/app/slices';
import { AppRootStateType } from 'store/store';
import { addTaskAC, updateTaskAC } from 'store/tasks/slices';
import { UpdateDomainTaskModelType } from 'store/tasks/types';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const fetchTasksTC = createAsyncThunk(
  'tasks/fetchTasks',
  async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await taskAPI.getTasks(todolistId);
    const tasks = res.data.items;

    thunkApi.dispatch(setAppStatusAC({ status: 'succeeded' }));

    return { tasks, todolistId };
  },
);

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTask',
  async (param: { taskId: string; todolistId: string }) => {
    await taskAPI.deleteTask(param.todolistId, param.taskId);

    return { taskId: param.taskId, todolistId: param.todolistId };
  },
);

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
