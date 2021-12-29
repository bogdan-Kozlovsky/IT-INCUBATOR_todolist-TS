import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TodoItem} from './TodoItem';
import {FilterValuesType} from '../App';
import './../App.scss'
import {FullInput} from './FullInput';


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
    changeStatus: (checked: boolean, id: string) => void
    filter: FilterValuesType
}


export const TodoList: FC<TodoListType> = (
    {task, subtitle, changeFilter, removeTask, addTask, ...props}) => {

    const [title, setTitle] = useState('')


    const filteringButtons = (eventFilter: FilterValuesType) => {
        changeFilter(eventFilter)
    }

    return (
        <div>

            <h3>{subtitle}</h3>
            <div>
                <FullInput addTask={addTask} setTitle={setTitle} title={title}/>
            </div>
            <ul>
                <TodoItem
                    task={task}
                    removeTask={removeTask}
                    changeStatus={props.changeStatus}
                />
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''}
                        onClick={() => filteringButtons('all')}>all
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={() => filteringButtons('active')}>active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={() => filteringButtons('completed')}>completed
                </button>

                {/*<Button name={'all'} callBack={() => filteringButtons('all')}/>*/}
                {/*<Button name={'active'} callBack={() => filteringButtons('active')}/>*/}
                {/*<Button name={'completed'} callBack={() => filteringButtons('completed')}/>*/}
            </div>

        </div>
    );
};

