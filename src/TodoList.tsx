import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {EditableSpan} from "./component/EditableSpan";
import {Input} from "./component/Input";

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
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTitle: (todolistId: string, title: string) => void
}


export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     let newTitle = title.trim();
    //     if (newTitle !== "") {
    //         props.addTask(newTitle, props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const onClickHandler = (tId: string) => props.removeTask(tId, props.id)
    const onChangeHandlerInput = (tId: string, event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked;
        props.changeTaskStatus(tId, newIsDoneValue, props.id);
    }


    const callBackHandlerForEditableSpan = (tId: string, title: string) => {
        props.updateTask(props.id, tId, title)
    }

    const callBackHandlerTitle = (title: string) => {
        props.updateTitle(props.id, title)
    }

    const callBackHandlerForInput = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <EditableSpan title={props.title} callBack={(title) => callBackHandlerTitle(title)}/>
        <button onClick={removeTodolist}>x</button>

        <div>
            <Input callback={callBackHandlerForInput}/>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={(event) => onChangeHandlerInput(t.id, event)}
                               checked={t.isDone}/>


                        <EditableSpan title={t.title}
                                      callBack={(title) => callBackHandlerForEditableSpan(t.id, title)}/>


                        {/*title всплития, если нам нужно в компонент EditableSpan title*/}
                        <button onClick={() => onClickHandler(t.id)}>x</button>
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


