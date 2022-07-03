import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { taskAPI } from 'api/task';
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from 'api/types';
import { setAppStatusAC } from 'app/app-reducer';
import { AppRootStateType } from 'app/store';
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from 'features/TodolistsList/todolists-reducer';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

const initialState: any = {};

export const fetchTasksTC = createAsyncThunk(
  'tasks/fetchTasks',
  async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await taskAPI.getTasks(todolistId);
    const tasks = res.data.items;

    thunkApi.dispatch(setAppStatusAC({ status: 'succeeded' }));

    // thunkApi.dispatch(setTasksAC({tasks, todolistId}))
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
const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskAC(state: any, action: PayloadAction<TaskType>) {
      state[action.payload.todoListId].unshift(action.payload);
    },
    updateTaskAC(
      state: any,
      action: PayloadAction<{ taskId: string; model: any; todolistId: string }>,
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t: any) => t.id === action.payload.taskId);

      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    // setTasksAC(state: any, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
    //     state[action.payload.todolistId] = action.payload.tasks
    // },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = [];
      });
      // [addTodolistAC.type]:(state:TasksStateType,action:PayloadAction<{}>)=>{},
      // [removeTodolistAC.type]:(state:TasksStateType,action:PayloadAction<{}>)=>{},
      // [setTodolistsAC.type]:(state:TasksStateType,action:PayloadAction<{}>)=>{},
    });
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    });
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t: any) => t.id === action.payload.taskId);

      if (index > -1) {
        tasks.splice(index, 1);
      }
    });
  },
});

export const tasksReducer = slice.reducer;
export const { addTaskAC, updateTaskAC } = slice.actions;

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

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
