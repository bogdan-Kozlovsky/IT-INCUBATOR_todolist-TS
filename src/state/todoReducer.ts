import {FilterValuesType, TodolistType} from "../App";

export const todolistsReducer = (state: Array<TodolistType>, action: GlobalType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let newState = [...state]
            return newState.filter(f => f.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all' as FilterValuesType}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return [...state].map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return [...state].map(m => m.id === action.payload.id ? {...m, filter: action.payload.newFilter} : m)
        }

        default:
            return state
    }
}

type GlobalType = todoListACType | addTodolistAcType | changeTodolistTitleACType | changedFilterACType
type todoListACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}


type addTodolistAcType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, id: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, id}
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}

type changedFilterACType = ReturnType<typeof changedFilterAC>
export const changedFilterAC = (id: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, newFilter}
    } as const
}
