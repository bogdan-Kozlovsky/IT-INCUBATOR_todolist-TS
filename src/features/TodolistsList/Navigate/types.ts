import { FilterValuesType, TodolistDomainType } from 'store/todolists/types';

export type NavigatePropsType = {
  todolist: TodolistDomainType;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
};
