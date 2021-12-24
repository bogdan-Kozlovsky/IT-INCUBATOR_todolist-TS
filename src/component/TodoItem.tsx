import React, {FC} from 'react';

type TodoListArrayType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    task: Array<TodoListArrayType>
    subtitle?: string
    removeTask: (id: string) => void
}

export const TodoItem: FC<TodoListType> = (props) => {

    const removeTask = (tID:string) => {
        props.removeTask(tID)
    }
    return (

        <div>
            {props.task.map(t => {
                return (
                    <div key={t.id}>
                        <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>
                        <button onClick={() => removeTask(t.id)}>X</button>
                    </div>
                )
            })}
        </div>
    );
};

