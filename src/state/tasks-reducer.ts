import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";


type RemoveTaskACType = {
    type: 'REMOVE-TASKS'
    id: string
    todolistId: string
}
type AddTaskACType = {
    type: 'ADD-TASKS'
    title: string
    todolistId: string
}

type ChangeTaskStatusACType = {
    type: 'CHANGE-TASKS'
    tasksId: string
    isDone: boolean
    todolistId: string
}

type ChangeTaskTitleACType = {
    type: 'CHANGE-TITLE-TASKS'
    tasksId: string
    todolistId: string
    title: string
}

type RemoveTodolistACType = {
    type: 'REMOVE-TODO'
    todolistId: string
}
type GlobalType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistACType


let initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}


export const tasksReducer = (state = initialState, action: GlobalType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.id)
            }
        }
        case "ADD-TASKS": {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case "CHANGE-TASKS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.tasksId ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case "CHANGE-TITLE-TASKS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.tasksId ? {
                    ...m,
                    title: action.title
                } : m)
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy

        }
        case "REMOVE-TODO": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}


export const removeTaskAC = (id: string, todolistId: string): RemoveTaskACType => {
    return {type: 'REMOVE-TASKS', id, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskACType => {
    return {type: 'ADD-TASKS', title, todolistId}
}


export const changeTaskStatusAC = (tasksId: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {
    return {type: 'CHANGE-TASKS', tasksId, isDone, todolistId}
}

export const changeTaskTitleAC = (tasksId: string, title: string, todolistId: string): ChangeTaskTitleACType => {
    return {type: 'CHANGE-TITLE-TASKS', tasksId, todolistId, title}
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistACType => {
    return {type: 'REMOVE-TODO', todolistId}
}
