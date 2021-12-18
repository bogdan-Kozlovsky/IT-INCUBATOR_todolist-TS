import React, {FC} from 'react';
import {TodoItem} from './TodoItem';
import {FilterValuesType} from '../App';


type TodoListArrayType = {
    id: number
    title: string
    isDone: boolean

}

type TodoListType = {
    task: Array<TodoListArrayType>
    subtitle?: string
    removeTask: (id: number) => void
    changeFilter: (value:FilterValuesType) => void
}


export const TodoList: FC<TodoListType> = (
    {task, subtitle, removeTask, changeFilter}) => {
    return (
        <div>

            <h3>{subtitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <TodoItem task={task} removeTask={removeTask}/>
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>

        </div>
    );
};

