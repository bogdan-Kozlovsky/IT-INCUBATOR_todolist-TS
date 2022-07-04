import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Todolist } from './Todolist/Todolist';

import { TaskStatuses } from 'api/types';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { useAppSelector } from 'hooks/useSelector';
import { selectIsLoggedIn } from 'store/auth/selectors';
import { addTaskTC, removeTaskTC, updateTaskTC } from 'store/tasks/asyncThunks';
import { selectTasks } from 'store/tasks/selectors';
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  removeTodolistTC,
} from 'store/todolists/asyncThunks';
import { selectTodolists } from 'store/todolists/selectors';
import { changeTodolistFilterAC } from 'store/todolists/slices';
import { FilterValuesType } from 'store/todolists/types';

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const dispatch = useDispatch();

  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const removeTask = useCallback((taskId: string, todolistId: string) => {
    dispatch(removeTaskTC({ taskId, todolistId }));
  }, []);

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(title, todolistId));
  }, []);

  const changeStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(id, { status }, todolistId));
    },
    [],
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(updateTaskTC(id, { title: newTitle }, todolistId));
    },
    [],
  );

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter: value }));
  }, []);

  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodolistTC(id));
  }, []);

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleTC(id, title));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          const allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
