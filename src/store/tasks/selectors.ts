// import { TaskType } from 'api/types';
import { AppRootStateType } from 'store/store';

export const selectTasks = (state: AppRootStateType) => state.tasks;
