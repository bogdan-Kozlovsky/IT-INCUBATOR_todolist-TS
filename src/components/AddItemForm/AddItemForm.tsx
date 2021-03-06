import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

import s from 'components/AddItemForm/style.module.css';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo(function ({
  addItem,
  disabled = false,
}: AddItemFormPropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    // eslint-disable-next-line no-magic-numbers
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <div>
      <span className={s.span}>Add new todolist:</span>
      <TextField
        variant="outlined"
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});
