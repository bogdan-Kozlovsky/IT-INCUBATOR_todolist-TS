import React, { useCallback } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Menu } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { useAppSelector } from 'hooks/useSelector';
import { selectStatus } from 'store/app/selectors';
import { logoutTC } from 'store/auth/asyncThunks/logoutTC';
import { selectIsLoggedIn } from 'store/auth/selectors';
import { addTodolistTC } from 'store/todolists/asyncThunks/addTodolistTC';

export const Header = () => {
  const dispatch = useDispatch();

  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
    <AppBar position="static" className="appBar">
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

        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
      </Toolbar>
      {isStatusLoading && (
        <div className="linearProgress">
          <LinearProgress />
        </div>
      )}
    </AppBar>
  );
};
