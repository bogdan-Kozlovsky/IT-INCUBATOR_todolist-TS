import React from "react";
import {action} from "@storybook/addon-actions";
import App from "../App";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
}
const callback = action('App')

export const AddItemFormBaseExample = (props: any) => {
    return <App/>
}