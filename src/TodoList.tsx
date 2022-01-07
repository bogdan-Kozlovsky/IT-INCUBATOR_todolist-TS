import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType, TaskType, todolistsType} from "./App";

type TodoListPropsType = {
    title: string
    addTask: (todolistId: string, title: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(props.todolistId, t.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.todolistId, trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickSetAllFilter = () => props.changeFilter(props.todolistId, "all")
    const onClickSetActiveFilter = () => props.changeFilter(props.todolistId, "active")
    const onClickSetCompletedFilter = () => props.changeFilter(props.todolistId, "completed")

    let allBtnClasses = ""
    if (props.filter === "all") {
        allBtnClasses = "active-filter"
    }

    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
        // return ["btn btn-hey"].concat(filter).join(" ")
    }
    const errorStyle = {
        color: "red",
    }

    const errorMessage = error
        ? <div style={errorStyle}>Title is required!</div>
        : <div>Enter task title</div>


    const onClickDelete = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={onClickDelete}>X</button>
            </h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={getBtnClass("all")} //"active btn btn-todolist"
                    onClick={onClickSetAllFilter}
                >All
                </button>
                <button
                    className={getBtnClass("active")}
                    onClick={onClickSetActiveFilter}
                >Active
                </button>
                <button
                    className={getBtnClass("completed")}
                    onClick={onClickSetCompletedFilter}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;