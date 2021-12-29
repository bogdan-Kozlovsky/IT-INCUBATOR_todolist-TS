import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {Input} from './Input';

type FullInputPropsType = {
    addTask: (title: string) => void
    setTitle: (title: string) => void
    title: string
}

export const FullInput = (props: FullInputPropsType) => {


    const addingTasks = () => {
        if (props.title.trim() !== '') {
            props.addTask(props.title.trim())
            props.setTitle('')
        }
        setError(true)
    }

    const [error, setError] = useState(false)


    return (
        <div className={'fullInput__box'}>

            <Input setTitle={props.setTitle} title={props.title} addingTasks={addingTasks} error={error}
                   setError={setError}/>
            <Button name={'+'} callBack={addingTasks}/>
        </div>
    );
};

