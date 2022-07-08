import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';

import { NavigatePropsType } from 'features/TodolistsList/Navigate/types';

export const Navigate = (props: NavigatePropsType) => {
  const { todolist, changeFilter } = props;

  const onAllClickHandler = useCallback(
    () => changeFilter('all', todolist.id),
    [todolist.id, changeFilter],
  );

  const onActiveClickHandler = useCallback(
    () => changeFilter('active', todolist.id),
    [todolist.id, changeFilter],
  );

  const onCompletedClickHandler = useCallback(
    () => changeFilter('completed', todolist.id),
    [todolist.id, changeFilter],
  );

  return (
    <>
      <Button
        variant={todolist.filter === 'all' ? 'outlined' : 'text'}
        onClick={onAllClickHandler}
        color="default"
      >
        All
      </Button>
      <Button
        variant={todolist.filter === 'active' ? 'outlined' : 'text'}
        onClick={onActiveClickHandler}
        color="primary"
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
        onClick={onCompletedClickHandler}
        color="secondary"
      >
        Completed
      </Button>
    </>
  );
};
