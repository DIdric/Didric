import React from 'react';
import { useCaseStudies } from '../../../hooks/useCaseStudies';
import { Editor } from '../Editor';
import { FormField } from './FormField';
import { MetricsField } from './MetricsField';
import { useFormData } from './useFormData';
import { useFormSubmit } from './useFormSubmit';
import type { CaseStudyError } from '../../../lib/api/case-studies';

interface CaseStudyFormProps {
  caseStudyId?: string;
  onSuccess?: () => void;
}

export default function CaseStudyForm({ caseStudyId, onSuccess }: CaseStudyFormProps) {
  const { createCaseStudy, updateCaseStudy, caseStudies } = useCaseStudies();
  const caseStudy = caseStudyId && caseStudyId !== 'new' 
    ? caseStudies?.find(cs => cs.id === caseStudyId)
    : null;

  const {
    formData,
    formErrors,
    setFormErrors,
    handleChange
  } = useFormData(caseStudy);

  const { handleSubmit, isSubmitting } = useFormSubmit({
    caseStudyId,
    formData,
    createCaseStudy,
    updateCaseStudy,
    onSuccess,
    setFormErrors
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formErrors.submit && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
          {formErrors.submit}
        </div>
      )}

      <FormField 
        label="Title" 
        error={formErrors.title}
      >
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-dark-600 bg-dark-800 text-gray-100 focus:ring-2 focus:ring-accent-blue focus:border-transparent"
          required
        />
      </FormField>

      {/* Add other form fields */}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Saving...'
          : caseStudyId && caseStudyId !== 'new'
          ? 'Update Case Study'
          : 'Create Case Study'}
      </button>
    </form>
  );
}