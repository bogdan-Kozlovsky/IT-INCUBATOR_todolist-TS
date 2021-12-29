import React, {FC} from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
}

export const Button: FC<ButtonPropsType> = ({name, callBack}) => {
    const onClickHandle = () => {
        callBack()
    }

    return (
        <button onClick={onClickHandle}>{name}</button>
    );
};

