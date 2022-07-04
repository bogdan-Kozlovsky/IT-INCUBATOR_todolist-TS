import React, { useCallback, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { Task } from './Task/Task';

import { TaskStatuses } from 'api/types';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import { TodolistPropsType } from 'features/TodolistsList/Todolist/types';
import { fetchTasksTC } from 'store/tasks/asyncThunks/fetchTasksTC';

export const Todolist = React.memo(function (props: TodolistPropsType) {
  const {
    todolist,
    changeTodolistTitle,
    changeTaskTitle,
    changeTaskStatus,
    removeTodolist,
    changeFilter,
    removeTask,
    tasks,
    addTask,
    demo,
  } = props;

  const dispatch = useDispatch();

  const onAddTaskClick = useCallback(
    (title: string) => {
      addTask(title, todolist.id);
    },
    [addTask, todolist.id],
  );

  const onRemoveTodolistClick = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleValue = useCallback(
    (title: string) => {
      changeTodolistTitle(todolist.id, title);
    },
    [todolist.id, changeTodolistTitle],
  );

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

  let tasksForTodolist = tasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchTasksTC(todolist.id));
  }, []);

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleValue} />
        <IconButton
          onClick={onRemoveTodolistClick}
          disabled={todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={onAddTaskClick}
        disabled={todolist.entityStatus === 'loading'}
      />
      <div>
        {tasksForTodolist.map(t => (
          <Task
            key={t.id}
            task={t}
            todolistId={todolist.id}
            removeTask={removeTask}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
          />
        ))}
      </div>
      <div style={{ paddingTop: '10px' }}>
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
      </div>
    </div>
  );
});
