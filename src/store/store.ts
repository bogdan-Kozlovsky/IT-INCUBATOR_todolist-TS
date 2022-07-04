import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { app } from 'store/app/slices';
import { auth } from 'store/auth/slices';
import { tasks } from 'store/tasks/slices';
import { todolists } from 'store/todolists/slices';

const rootReducer = combineReducers({
  tasks,
  todolists,
  app,
  auth,
});

export type RootReducerType = typeof rootReducer;
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<RootReducerType>;

type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
