import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


// initialState
const initialState: TasksStateType = {}

// reducer
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = tasks.filter(t => t.id !== action.taskId);
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.task.todoListId];
            // const newTasks = [action.task, ...tasks];
            // stateCopy[action.task.todoListId] = newTasks;
            // return stateCopy;
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            // let todolistTasks = state[action.todolistId];
            // let newTasksArray = todolistTasks
            //     .map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            //
            // state[action.todolistId] = newTasksArray;
            // return ({...state});
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            // let todolistTasks = state[action.todolistId];
            // // найдём нужную таску:
            // let newTasksArray = todolistTasks
            //     .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            //
            // state[action.todolistId] = newTasksArray;
            // return ({...state});
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    return t.id === action.taskId ? {...t, title: action.title} : t
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolists.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todolist.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case "SET-TASKS": {
            // const stateCopy = {...state}
            // stateCopy[action.todolistId] = action.tasks
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}


// action
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', model, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


// types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistType

// thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const removeTasksTC = (taskId: string, todolistId: string,) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(taskId, todolistId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
        .catch(err => console.log(err))
}

export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(f => f.id === id)
    if (!task) {
        console.warn('task not found')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
    }
    todolistsAPI.updateTask(todolistId, id, apiModel)
        .then(res => {
            dispatch(updateTaskAC(id, apiModel, todolistId))
        })
}
