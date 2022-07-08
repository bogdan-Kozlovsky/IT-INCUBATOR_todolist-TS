import React, { useCallback, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Todolist } from './Todolist/Todolist';

import { TaskStatuses } from 'api/types';
import s from 'features/TodolistsList/style.module.css';
import { useAppSelector } from 'hooks/useSelector';
import { selectIsLoggedIn } from 'store/auth/selectors';
import { addTaskTC } from 'store/tasks/asyncThunks/addTaskTC';
import { removeTaskTC } from 'store/tasks/asyncThunks/removeTaskTC';
import { updateTaskTC } from 'store/tasks/asyncThunks/updateTaskTC';
import { selectTasks } from 'store/tasks/selectors';
import { changeTodolistTitleTC } from 'store/todolists/asyncThunks/changeTodolistTitleTC';
import { fetchTodolistsTC } from 'store/todolists/asyncThunks/fetchTodolistsTC';
import { removeTodolistTC } from 'store/todolists/asyncThunks/removeTodolistTC';
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
    <Grid container spacing={3} className={s.wrapper}>
      {todolists.map(tl => {
        const allTodolistTasks = tasks[tl.id];

        return (
          <Grid key={tl.id}>
            <Paper className={s.block}>
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
  );
};
