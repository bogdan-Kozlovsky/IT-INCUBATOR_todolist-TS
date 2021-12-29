import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './../App.scss'


type InputPropsType = {
    setTitle: (title: string) => void
    addingTasks: () => void
    title: string
    error: boolean
    setError: (error: boolean) => void
}
export const Input = (props: InputPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
        props.setError(false)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addingTasks()
        }
        props.setError(true)

    }

    return (
        <div>
            <input
                className={props.error ? 'error' : ''}
                onChange={onChangeHandler}
                value={props.title}
                onKeyPress={onKeyPressHandler}
                type="text"></input>
            {props.error && <p className={'errorMessage'}>Title is required!!</p>}
        </div>
    )
};
