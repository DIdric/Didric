import { useState } from 'react';
import { CaseStudyError } from '../../../lib/api/case-studies';
import type { CaseStudy } from '../../../lib/api/case-studies';

interface UseFormSubmitProps {
  caseStudyId?: string;
  formData: Partial<CaseStudy>;
  createCaseStudy: any;
  updateCaseStudy: any;
  onSuccess?: () => void;
  setFormErrors: (errors: Record<string, string>) => void;
}

export function useFormSubmit({
  caseStudyId,
  formData,
  createCaseStudy,
  updateCaseStudy,
  onSuccess,
  setFormErrors
}: UseFormSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setIsSubmitting(true);
    
    try {
      // Filter out empty metrics
      const cleanedFormData = {
        ...formData,
        metrics: formData.metrics?.filter(m => m.label && m.value) || []
      };

      if (caseStudyId && caseStudyId !== 'new') {
        await updateCaseStudy.mutateAsync({
          id: caseStudyId,
          ...cleanedFormData
        });
      } else {
        await createCaseStudy.mutateAsync(cleanedFormData);
      }

      onSuccess?.();
    } catch (err) {
      if (err instanceof CaseStudyError) {
        if (err.errors?.length) {
          // Map validation errors to form fields
          const errors = err.errors.reduce((acc, { field, message }) => ({
            ...acc,
            [field]: message
          }), {});
          setFormErrors(errors);
        } else {
          setFormErrors({ submit: err.message });
        }
      } else {
        setFormErrors({ 
          submit: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
}