import React from "react";
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm',
    component: AddItemForm,
}
const callback = action('Button click')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}