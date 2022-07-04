import React, { useEffect } from 'react';

import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar';
import { Header } from 'components/Header/Header';
import { Login } from 'features/Login/Login';
import { TodolistsList } from 'features/TodolistsList/TodolistsList';
import { useAppSelector } from 'hooks/useSelector';
import { initializeAppTC } from 'store/app/asyncThunks/initializeAppTC';
import { selectIsInitialized } from 'store/app/selectors';

type PropsType = {
  demo?: boolean;
};

export const App = ({ demo = false }: PropsType) => {
  const dispatch = useDispatch();

  const isInitialized = useAppSelector(selectIsInitialized);

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
      <Header />
      <Container fixed>
        <Route path="/" render={() => <TodolistsList demo={demo} />} />
        <Route path="/login" render={() => <Login />} />
      </Container>
    </div>
  );
};
