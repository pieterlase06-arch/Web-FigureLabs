import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <div className={`inline-flex items-center font-aeonik text-caption tracking-caption px-3 py-1.5 rounded-badges border border-onyx-edge bg-surface ${className}`}>
      {variant === 'default' && (
        <span className="w-2 h-2 rounded-full bg-[#10B981] mr-2 flex-shrink-0"></span>
      )}
      <span className={variant === 'accent' ? 'text-amber-whisper' : 'text-frost-text'}>
        {children}
      </span>
    </div>
  );
}
