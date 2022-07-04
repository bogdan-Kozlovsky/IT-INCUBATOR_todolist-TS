import React, { useCallback, useEffect } from 'react';

import './App.css';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar';
import { Login } from 'features/Login/Login';
import { TodolistsList } from 'features/TodolistsList/TodolistsList';
import { useAppSelector } from 'hooks/useSelector';
import { initializeAppTC } from 'store/app/asyncThunks';
import { selectIsInitialized, selectStatus } from 'store/app/selectors';
import { logoutTC } from 'store/auth/asyncThunks';
import { selectIsLoggedIn } from 'store/auth/selectors';

type PropsType = {
  demo?: boolean;
};

export const App = ({ demo = false }: PropsType) => {
  const dispatch = useDispatch();

  const status = useAppSelector(selectStatus);
  const isInitialized = useAppSelector(selectIsInitialized);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const isStatusLoading = status === 'loading';

  const onLogoutClick = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC());
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={onLogoutClick}>
              Log out
            </Button>
          )}
        </Toolbar>
        {isStatusLoading && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Route path="/" render={() => <TodolistsList demo={demo} />} />
        <Route path="/login" render={() => <Login />} />
      </Container>
    </div>
  );
};
