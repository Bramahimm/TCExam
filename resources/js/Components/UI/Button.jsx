import React from 'react';

export default function Button({ 
    children, 
    type = 'button', 
    onClick, 
    isLoading = false, 
    variant = 'primary', 
    className = '' 
}) {
    const baseStyles = "font-bold text-white rounded transition-all flex items-center justify-center gap-2 py-1";
    const variants = {
        primary: "bg-[#00a65a] hover:bg-[#008d4c]",
        danger: "bg-red-500 hover:bg-red-600",
        warning: "bg-yellow-400 hover:bg-yellow-500 text-black"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {isLoading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
}