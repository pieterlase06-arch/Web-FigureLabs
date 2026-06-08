import React from 'react';

export default function Button({ variant = 'primary', children, onClick, icon, className = '' }) {
  const baseStyles = "inline-flex items-center justify-center font-aeonik font-bold uppercase transition-colors duration-200 tracking-body";
  
  const variants = {
    primary: "bg-pure-white text-obsidian-canvas text-[13px] sm:text-[14px] rounded-buttons px-5 py-2.5 hover:bg-silver",
    outlined: "bg-transparent border border-silver text-frost-text text-[13px] sm:text-[14px] rounded-buttons px-5 py-2.5 hover:bg-surface",
    chat: "bg-pure-white text-obsidian-canvas text-[13px] rounded-pills px-5 py-2.5 hover:bg-silver"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
