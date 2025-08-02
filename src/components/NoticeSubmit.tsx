import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useCurrentUser } from '../store/useAuth';
import { NoticeFormData } from '../types';
import toast from 'react-hot-toast';

interface NoticeSubmitProps {
  onSubmitSuccess?: () => void;
  className?: string;
}

const NoticeSubmit: React.FC<NoticeSubmitProps> = ({ onSubmitSuccess, className }) => {
  const user = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NoticeFormData>({
    title: '',
    description: '',
    category: '',
    location: '',
    tag: '',
  });
  const [errors, setErrors] = useState<Partial<NoticeFormData>>({});

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'event', label: 'Event' },
    { value: 'announcement', label: 'Announcement' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'other', label: 'Other' },
  ];

  const tags = [
    { value: '', label: 'Select Tag (Optional)' },
    { value: 'Block A', label: 'Block A' },
    { value: 'Block B', label: 'Block B' },
    { value: 'Block C', label: 'Block C' },
    { value: '1st Floor', label: '1st Floor' },
    { value: '2nd Floor', label: '2nd Floor' },
    { value: '3rd Floor', label: '3rd Floor' },
    { value: 'Parking', label: 'Parking' },
    { value: 'Common Area', label: 'Common Area' },
    { value: 'Garden', label: 'Garden' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<NoticeFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to submit a notice');
      return;
    }

    setIsSubmitting(true);

    try {
      const noticeData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        location: formData.location.trim(),
        tag: formData.tag || null,
        author: user.name,
        authorId: user.id,
        status: 'pending' as const,
        isPinned: false,
        timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        reactions: {
          likes: 0,
          thumbsUp: 0,
          sad: 0,
        },
      };

      await addDoc(collection(db, 'notices'), noticeData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        tag: '',
      });
      
      toast.success('Notice submitted successfully!');
      onSubmitSuccess?.();
      
    } catch (error) {
      console.error('Error submitting notice:', error);
      toast.error('Failed to submit notice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className || ''}`}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Submit a Notice</h2>
        <p className="text-sm text-gray-600">
          Report issues, suggestions, or announcements to your community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.title 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="Brief title for your notice"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Category and Tag Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-colors ${
                errors.category 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
              Tag (Optional)
            </label>
            <select
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {tags.map(tag => (
                <option key={tag.value} value={tag.value}>
                  {tag.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.location 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="e.g., Apartment 3B, Common Area, Parking Lot"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical ${
              errors.description 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="Provide detailed information about the issue or announcement"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
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
    </div>
  );
};

export default NoticeSubmit;
