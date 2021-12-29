import React, {ChangeEvent, FC} from 'react';
import {Button} from './Button';

type TodoListArrayType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    task: Array<TodoListArrayType>
    subtitle?: string
    removeTask: (id: string) => void
    changeStatus: (checked: boolean, id: string) => void
}

export const TodoItem = (props: TodoListType) => {

    const removeTask = (tID: string) => {
        props.removeTask(tID)
    }


    const onChangeHandler = (value: boolean, id: string) => {
        props.changeStatus(value, id)
    }

    return (

        <div>
            {props.task.map(t => {

                return (
                    <div key={t.id}>
                        <li>
                            <input type="checkbox"
                                   onChange={(event) => onChangeHandler(event.currentTarget.checked, t.id)}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                        <Button name={'X'} callBack={() => removeTask(t.id)}/>
                    </div>
                )
            })}
        </div>
    );
};

