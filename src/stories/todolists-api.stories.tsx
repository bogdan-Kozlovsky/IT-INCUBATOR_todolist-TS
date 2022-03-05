import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(response => {
                setState(response.data)
            })
            .catch(e => alert(e))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('Zoi')
            .then(response => {
                console.log(response)
                setState(response.data)
            })
            .catch(e => alert(e))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'a4bec573-782e-4642-af2b-489691a37477'
        todolistAPI.deleteTodolist(todolistId)
            .then(response => {
                setState(response.data)
            })
            .catch(e => alert(e))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'fdaaf80b-fb02-4ae7-a473-c42d7876fcfa'
        todolistAPI.putTodolist(todolistId, 'Ivan')
            .then(response => {
                setState(response.data)
            })
            .catch(e => alert(e))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
