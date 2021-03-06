import React from 'react';

import { App } from 'app/App';
import {
  BrowserRouterDecorator,
  ReduxStoreProviderDecorator,
} from 'stories/decorators/ReduxStoreProviderDecorator';

export default {
  title: 'App Stories',
  component: App,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
};

export const AppBaseExample = () => {
  return <App demo />;
};
