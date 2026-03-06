import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Text = ({ 
  id, 
  content, 
  style = {},
  className 
}) => {
  return (
    <div
      id={id}
      className={twMerge(clsx('text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap', className))}
      style={style}
      dangerouslySetInnerHTML={{ __html: (content || 'Lorem ipsum').replace(/\n/g, '<br />') }}
    />
  );
};

export default Text;
