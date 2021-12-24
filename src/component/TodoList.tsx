import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TodoItem} from './TodoItem';
import {FilterValuesType} from '../App';


type TodoListArrayType = {
    id: string
    title: string
    isDone: boolean

}

type TodoListType = {
    task: Array<TodoListArrayType>
    subtitle?: string
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}


export const TodoList: FC<TodoListType> = (
    {task, subtitle, removeTask, changeFilter, addTask}) => {

    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    const addingTasks = () => {
        if (title.length > 0) {
            addTask(title)
            setTitle('')
        }
    }
// Enter addTask
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addingTasks()
        }
    }

    //рефакторинг
    const filteringButtons = (eventFilter: FilterValuesType) => {
        changeFilter(eventFilter)
    }
    // const filteringActiveButtons = () => {
    //     changeFilter('active')
    // }
    // const filteringCompletedButtons = () => {
    //     changeFilter('completed')
    // }
    return (
        <div>

            <h3>{subtitle}</h3>
            <div>
                <input onChange={onChangeHandler} value={title} onKeyPress={onKeyPressHandler}/>
                <button onClick={addingTasks}>+</button>
            </div>
            <ul>
                <TodoItem task={task} removeTask={removeTask}/>
            </ul>
            <div>
                <button onClick={() => filteringButtons('all')}>All</button>
                <button onClick={() => filteringButtons('active')}>Active</button>
                <button onClick={() => filteringButtons('completed')}>Completed</button>
            </div>

        </div>
    );
};

