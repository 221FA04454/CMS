import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Container = ({ 
  id, 
  children, 
  style = {},
  className,
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  flexWrap = 'nowrap',
  gap = '12px'
}) => {
  return (
    <div
      id={id}
      className={twMerge(clsx('flex w-full min-h-[50px] transition-all', className))}
      style={{
        ...style,
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap
      }}
    >
      {children}
    </div>
  );
};

export default Container;
