import React, { ChangeEvent, useCallback } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';

import { TaskStatuses } from 'api/types';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import { TaskPropsType } from 'features/TodolistsList/Todolist/Task/types';

export const Task = React.memo((props: TaskPropsType) => {
  const { task, changeTaskTitle, changeTaskStatus, todolistId, removeTask } = props;

  const onClickHandler = useCallback(
    () => removeTask(task.id, todolistId),
    [task.id, todolistId],
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;

      changeTaskStatus(
        task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        todolistId,
      );
    },
    [task.id, todolistId],
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      changeTaskTitle(task.id, newValue, todolistId);
    },
    [task.id, todolistId],
  );

  return (
    <div
      key={task.id}
      className={task.status === TaskStatuses.Completed ? 'is-done' : ''}
    >
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
