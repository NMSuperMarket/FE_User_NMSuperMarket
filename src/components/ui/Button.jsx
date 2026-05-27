import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors duration-200 inline-flex items-center justify-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-secondary text-white hover:bg-orange-500",
    outline: "border-2 border-primary text-primary hover:bg-green-50",
    ghost: "text-primary hover:bg-green-50"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
