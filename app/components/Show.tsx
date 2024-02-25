import React from 'react'

type ConditionalRender = {
  when: boolean,
  children: React.ReactElement
}

const Show = ({ children, when }: ConditionalRender) => {
  return (
    when ? children : null
  )
}

export default Show