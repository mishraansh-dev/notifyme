import React, { useState } from 'react';

interface NoticeFormData {
  title: string;
  description: string;
  tag?: string;
  date: string;
}

interface NoticeFormProps {
  onSubmit: (data: NoticeFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<NoticeFormData>;
  isLoading?: boolean;
  className?: string;
}

const NoticeForm: React.FC<NoticeFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  className,
}) => {
  const [formData, setFormData] = useState<NoticeFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    tag: initialData?.tag || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Partial<NoticeFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof NoticeFormData, boolean>>>({});

  const tagOptions = [
    { value: '', label: 'Select a tag (optional)' },
    { value: 'Announcement', label: 'Announcement' },
    { value: 'Alert', label: 'Alert' },
    { value: 'Event', label: 'Event' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Emergency', label: 'Emergency' },
    { value: 'Block A', label: 'Block A' },
    { value: 'Block B', label: 'Block B' },
    { value: 'Block C', label: 'Block C' },
    { value: 'General', label: 'General' },
  ];

  const validateField = (name: keyof NoticeFormData, value: string) => {
    switch (name) {
      case 'title':
        return value.trim().length < 3 ? 'Title must be at least 3 characters long' : '';
      case 'description':
        return value.trim().length < 10 ? 'Description must be at least 10 characters long' : '';
      case 'date':
        return !value ? 'Date is required' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof NoticeFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name as keyof NoticeFormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Partial<NoticeFormData> = {};
    (Object.keys(formData) as (keyof NoticeFormData)[]).forEach(key => {
      const value = formData[key];
      if (value !== undefined) {
        const error = validateField(key, value);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({
      title: true,
      description: true,
      date: true,
      tag: true,
    });

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className || ''}`}>
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
            errors.title && touched.title
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          placeholder="Enter notice title"
        />
        {errors.title && touched.title && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical ${
            errors.description && touched.description
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          placeholder="Enter detailed description of the notice"
        />
        {errors.description && touched.description && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.description}
          </p>
        )}
      </div>

      {/* Tag and Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tag Field */}
        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
            Tag
          </label>
          <select
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {tagOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Field */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.date && touched.date
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          {errors.date && touched.date && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.date}
            </p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0 pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Notice'
          )}
        </button>
      </div>
    </form>
  );
};

export default NoticeForm;
