import { createAsyncThunk } from '@reduxjs/toolkit';

import { taskAPI } from 'api/task';
import { setAppStatusAC } from 'store/app/slices';

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
