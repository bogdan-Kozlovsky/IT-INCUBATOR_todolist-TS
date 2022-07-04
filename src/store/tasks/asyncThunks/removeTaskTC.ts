import { createAsyncThunk } from '@reduxjs/toolkit';

import { taskAPI } from 'api/task';

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTask',
  async (param: { taskId: string; todolistId: string }) => {
    await taskAPI.deleteTask(param.todolistId, param.taskId);

    return { taskId: param.taskId, todolistId: param.todolistId };
  },
);
