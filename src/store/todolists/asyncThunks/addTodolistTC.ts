import { Dispatch } from 'redux';

import { todolistsAPI } from 'api/todolist';
import { setAppStatusAC } from 'store/app/slices';
import { addTodolistAC } from 'store/todolists/slices';

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistsAPI.createTodolist(title).then((res: { data: { data: { item: any } } }) => {
      dispatch(addTodolistAC({ todolist: res.data.data.item }));
      dispatch(setAppStatusAC({ status: 'succeeded' }));
    });
  };
};
