import React from 'react';

type ConditionalRender = {
  condition: boolean;
  ifComponent: React.ReactElement;
  elseComponent: React.ReactElement;
};

const ConditionalRender = ({ condition, ifComponent, elseComponent }: ConditionalRender) => {
  return condition ? ifComponent : elseComponent;
};

export default ConditionalRender;