import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-text">{label}</label>}
      <input 
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-red-500' : 'border-border'}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
