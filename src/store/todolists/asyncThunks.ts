import { Dispatch } from 'redux';

import { todolistsAPI } from 'api/todolist';
import { setAppStatusAC } from 'store/app/slices';
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from 'store/todolists/slices';
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
