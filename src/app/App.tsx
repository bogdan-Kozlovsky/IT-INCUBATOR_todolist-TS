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
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { logoutTC } from '../features/Login/auth-reducer';
import { Login } from '../features/Login/Login';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';

import { initializeAppTC, RequestStatusType } from './app-reducer';
import { AppRootStateType } from './store';

type PropsType = {
  demo?: boolean;
};

const App = ({ demo = false }: PropsType) => {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.status,
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    state => state.app.isInitialized,
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC());
    }
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
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
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Route path="/" render={() => <TodolistsList demo={demo} />} />
        <Route path="/login" render={() => <Login />} />
      </Container>
    </div>
  );
};

export default App;
