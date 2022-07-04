import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskType } from 'api/types';
import { fetchTasksTC } from 'store/tasks/asyncThunks/fetchTasksTC';
import { removeTaskTC } from 'store/tasks/asyncThunks/removeTaskTC';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from 'store/todolists/slices';

const initialState: any = {};

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

export const tasks = slice.reducer;
export const { addTaskAC, updateTaskAC } = slice.actions;
