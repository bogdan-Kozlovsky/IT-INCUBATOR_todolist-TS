import React from 'react';

import { action } from '@storybook/addon-actions';

import { AddItemForm } from './AddItemForm';

export default {
  title: 'AddItemForm Stories',
  component: AddItemForm,
};

export const AddItemFormBaseExample = () => {
  return <AddItemForm addItem={action('Button inside form clicked')} />;
};

export const AddItemFormDisabledExample = () => {
  return <AddItemForm disabled addItem={action('Button inside form clicked')} />;
};
