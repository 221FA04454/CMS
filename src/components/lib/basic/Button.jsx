import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEditorStore } from '../../../store/editorStore';

const Button = ({ 
  id, 
  text, 
  variant = 'primary', 
  style = {}, 
  onClick,
  link,
  className 
}) => {
  // Gracefully check editor mode. Defaults to published if not found.
  const mode = useEditorStore((state) => state?.mode) || 'published';

  const baseClasses = "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 focus:ring-indigo-500",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-indigo-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400"
  };

  const content = (
    <span className="truncate">{text}</span>
  );

  const handleClick = (e) => {
    // Prevent accidental navigations/submissions while designing the page
    if (mode === 'edit') {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Execute interactions registered via builder
    if (onClick) {
        onClick(e);
    }
  };

  if (link && link.trim() !== '') {
    return (
        <a 
            id={id}
            href={link}
            target={mode === 'edit' ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={twMerge(clsx(baseClasses, variants[variant], className))}
            style={style}
            onClick={handleClick}
        >
            {content}
        </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      className={twMerge(clsx(baseClasses, variants[variant], className))}
      style={style}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Button;
