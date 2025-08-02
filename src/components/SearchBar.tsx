import React, { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  debounceMs?: number;
  className?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search notices...',
  onClear,
  debounceMs = 500,
  className,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  // Debounced onChange handler
  const debouncedOnChange = useCallback(
    debounce((searchValue: string) => {
      onChange(searchValue);
    }, debounceMs),
    [onChange, debounceMs]
  );

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    debouncedOnChange(newValue);
  };

  // Handle clear button click
  const handleClear = () => {
    setInternalValue('');
    onChange('');
    onClear?.();
  };

  return (
    <div className={`relative ${className || ''}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <input
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-400'
        }`}
        aria-label="Search"
      />
      
      {(internalValue || value) && !disabled && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full p-1 transition-colors"
            aria-label="Clear search"
            type="button"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default SearchBar;
