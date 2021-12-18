import React, {FC} from 'react';

type TodoListArrayType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListType = {
    task: Array<TodoListArrayType>
    subtitle?: string
    removeTask: Function
}

export const TodoItem: FC<TodoListType> = (props) => {
    // debugger
    return (

        <div>
            {props.task.map(el => {
                return (
                    <div key={el.id}>
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                        <button onClick={() => {
                            props.removeTask(el.id)}}>X
                        </button>
                    </div>
                )
            })}
        </div>
    );
};

