import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'edbb6621-0047-4274-8a4c-f1d2a1bf4727'
    },
    withCredentials: true
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType<{}>>(`/todo-lists/${todolistId}`)
    },
    putTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseType<{}>>(`/todo-lists/${todolistId}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
}


type BaseResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

