import React from 'react';

export default function Input({ 
    label, 
    type = 'text', 
    value, 
    onChange, 
    error, 
    placeholder, 
    icon, 
    isRequired = false 
}) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="text-sm font-bold text-gray-700">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </label>
            )}
            
            <div className="relative">
                {icon && (
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
                        w-full border rounded-md p-2.5 outline-none transition-all
                        ${icon ? 'pl-10' : 'px-3'}
                        ${error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500'}
                    `}
                />
            </div>
            
            {error && (
                <span className="text-xs text-red-500 font-medium">{error}</span>
            )}
        </div>
    );
}