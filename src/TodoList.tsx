import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./component/Button";
import {EditableSpan} from "./component/EditableSpan";
import {Form} from "./component/Form/Form";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, tId: string, title: string) => void
    updateTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onClickHandler = (tId: string) => props.removeTask(tId, props.id)

    const onChangeHandlerInput = (tID: string, e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(tID, newIsDoneValue, props.id);
    }

    const callBackHandlerForEditableSpan = (tId: string, title: string) => {
        props.updateTask(props.id, tId, title)
    }

    const callBackHandlerForEditableForTitle = (title: string) => {
        props.updateTitle(props.id, title)
    }

    const callBackHandlerForInput = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }
    return <div>
        <div>
            <EditableSpan title={props.title} callBack={(title) => callBackHandlerForEditableForTitle(title)}/>
            <button onClick={removeTodolist}>x</button>
        </div>

        <Form callBack={(newTitle) => callBackHandlerForInput(newTitle)}/>

        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={(e) => onChangeHandlerInput(t.id, e)} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      callBack={(title) => callBackHandlerForEditableSpan(t.id, title)}/>
                        <Button callBack={() => onClickHandler(t.id)} name={'X'}/>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


