import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TodolistType } from 'api/types';
import { RequestStatusType } from 'store/app/types';
import { FilterValuesType, TodolistDomainType } from 'store/todolists/types';

const initialState: Array<TodolistDomainType> = [];
const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    removeTodolistAC(state: any, action: PayloadAction<{ id: string }>) {
      // state.filter(tl => tl.id != action.payload.id)
      const index = state.findIndex((tl: { id: string }) => tl.id === action.payload.id);

      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC(state: any, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
    },
    changeTodolistTitleAC(
      state: any,
      action: PayloadAction<{ id: string; title: string }>,
    ) {
      const index = state.findIndex((tl: { id: string }) => tl.id === action.payload.id);

      state[index].title = action.payload.title;
    },
    changeTodolistFilterAC(
      state: any,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) {
      const index = state.findIndex((tl: { id: string }) => tl.id === action.payload.id);

      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatusAC(
      state: any,
      action: PayloadAction<{ id: string; status: RequestStatusType }>,
    ) {
      const index = state.findIndex((tl: { id: string }) => tl.id === action.payload.id);

      state[index].entityStatus = action.payload.status;
    },
    setTodolistsAC(
      state: any,
      action: PayloadAction<{ todolists: Array<TodolistType> }>,
    ) {
      return action.payload.todolists.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }));
    },
  },
});

export const todolists = slice.reducer;
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistsAC,
} = slice.actions;
