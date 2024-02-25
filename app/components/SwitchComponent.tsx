import React from 'react';

type Case = {
  condition: boolean;
  component: React.ReactElement;
};

type SwitchProps = {
  children: Case[];
  defaultComponent?: React.ReactElement;
};

const Switch = ({ children, defaultComponent }: SwitchProps) => {
  for (let i = 0; i < children.length; i++) {
    const { condition, component } = children[i];
    if (condition) {
      return component;
    }
  }

  return defaultComponent || null;
};

export default Switch;
