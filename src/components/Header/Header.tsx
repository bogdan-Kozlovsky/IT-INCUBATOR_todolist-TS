import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import logo from 'assets/images/logo.svg';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import s from 'components/Header/style.module.css';
import { useAppSelector } from 'hooks/useSelector';
import { selectStatus } from 'store/app/selectors';
import { logoutTC } from 'store/auth/asyncThunks/logoutTC';
import { selectIsLoggedIn } from 'store/auth/selectors';
import { addTodolistTC } from 'store/todolists/asyncThunks/addTodolistTC';

export const Header = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const isOpacityElement = pathname !== '/login';
  const isStatusLoading = status === 'loading';

  const onLogoutClick = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  return (
    <div className={`${s.wrapper} container`}>
      <img src={logo} alt="logo" />
      {isStatusLoading && (
        <div className="linearProgress">
          <LinearProgress />
        </div>
      )}

      {isOpacityElement && <AddItemForm addItem={addTodolist} />}
      {isLoggedIn && (
        <Button color="inherit" onClick={onLogoutClick}>
          Log out
        </Button>
      )}
    </div>
  );
};
