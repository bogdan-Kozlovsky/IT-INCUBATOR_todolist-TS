import { Dispatch } from 'redux';

import { todolistsAPI } from 'api/todolist';
import { changeTodolistTitleAC } from 'store/todolists/slices';

export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    todolistsAPI.updateTodolist(id, title).then(() => {
      dispatch(changeTodolistTitleAC({ id, title }));
    });
  };
};
