import { Dispatch } from 'redux';

import { todolistsAPI } from 'api/todolist';
import { setAppStatusAC } from 'store/app/slices';
import { changeTodolistEntityStatusAC, removeTodolistAC } from 'store/todolists/slices';

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
