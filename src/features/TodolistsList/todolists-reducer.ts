import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { todolistsAPI } from 'api/todolist';
import { TodolistType } from 'api/types';
import { RequestStatusType, setAppStatusAC } from 'app/app-reducer';
import { handleServerNetworkError } from 'utils/error-utils';

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

export const todolistsReducer = slice.reducer;
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistsAC,
} = slice.actions;

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
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    // изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC({ status: 'loading' }));
    // изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }));
    todolistsAPI.deleteTodolist(todolistId).then(() => {
      dispatch(removeTodolistAC({ id: todolistId }));
      // скажем глобально приложению, что асинхронная операция завершена
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistsAPI.createTodolist(title).then((res: { data: { data: { item: any } } }) => {
      dispatch(addTodolistAC({ todolist: res.data.data.item }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    todolistsAPI.updateTodolist(id, title).then(() => {
      dispatch(changeTodolistTitleAC({ id, title }));
    });
  };
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
// type ThunkDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType>;
