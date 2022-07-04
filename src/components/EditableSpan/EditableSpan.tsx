import React, { ChangeEvent, useState } from 'react';

import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  const { value, onChange } = props;
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  );
});
