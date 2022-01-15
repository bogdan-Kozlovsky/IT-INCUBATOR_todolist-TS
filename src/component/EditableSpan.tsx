import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack:(title:string) => void
}
export const EditableSpan = ({...props}: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const editActiveMode = () => {
        setEditMode(true)
    }

    const activeViewMode = () => {
        setEditMode(false)
        props.callBack(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input type="text" value={title} onChange={onChangeHandler} autoFocus onBlur={activeViewMode}/>
            : <span onDoubleClick={editActiveMode}>{props.title}</span>
    );
};

