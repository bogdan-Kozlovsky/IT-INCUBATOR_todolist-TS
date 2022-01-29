import React, {ChangeEvent} from 'react';

type CheckboxType = {
    callback: (isDone: boolean) => void
    checked: boolean
}
export const Checkbox = ({...props}: CheckboxType) => {
    const callbackHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={callbackHandler} checked={props.checked}/>
    );
};

