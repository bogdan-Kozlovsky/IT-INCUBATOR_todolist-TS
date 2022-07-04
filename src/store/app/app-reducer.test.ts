import { app, setAppErrorAC, setAppStatusAC } from 'store/app/slices';
import { InitialStateTypeApp } from 'store/app/types';

let startState: InitialStateTypeApp;

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
    isInitialized: false,
  };
});

test('correct error message should be set', () => {
  const endState = app(startState, setAppErrorAC({ error: 'some error' }));

  expect(endState.error).toBe('some error');
});

test('correct status should be set', () => {
  const endState = app(startState, setAppStatusAC({ status: 'loading' }));

  expect(endState.status).toBe('loading');
});
