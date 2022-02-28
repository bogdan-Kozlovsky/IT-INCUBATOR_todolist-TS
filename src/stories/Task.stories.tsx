import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../state/Task";

export default {
    title: 'Task',
    component: Task,
}
const removeCallback = action('removeCallback')
const changeTaskStatusCallback = action('changeTaskStatusCallback')
const changeTaskTitleCallback = action('changeTaskTitleCallback')

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', title: 'React', isDone: true}}
            todolistId={'1'}
            removeTask={removeCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />

        <Task
            task={{id: '2', title: 'JS', isDone: false}}
            todolistId={'2'}
            removeTask={removeCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>

}