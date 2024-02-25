'use client'
import React from 'react';

// Define a generic type Data
type Data<T> = {
  data: T;
};

// Specify the type of props for LogFile component
export const LogFile = <T,>({ data }: Data<T>) => {
  console.log(data)
  return <div className='absolute'></div>;
};

