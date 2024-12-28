import { useState, useEffect } from 'react';
import type { CaseStudy } from '../../../lib/api/case-studies';

const defaultFormData = {
  title: '',
  category: '',
  description: '',
  content: '',
  image_url: '',
  year: new Date().getFullYear().toString(),
  client: '',
  metrics: [{ label: '', value: '' }],
  featured: false,
};

export function useFormData(caseStudy?: CaseStudy | null) {
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (caseStudy) {
      setFormData({
        title: caseStudy.title,
        category: caseStudy.category,
        description: caseStudy.description,
        content: caseStudy.content,
        image_url: caseStudy.image_url || '',
        year: caseStudy.year,
        client: caseStudy.client,
        metrics: caseStudy.metrics?.length > 0 
          ? caseStudy.metrics 
          : [{ label: '', value: '' }],
        featured: caseStudy.featured,
      });
    }
  }, [caseStudy]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is modified
    if (formErrors[field]) {
      setFormErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return {
    formData,
    formErrors,
    setFormErrors,
    handleChange,
    resetForm: () => setFormData(defaultFormData)
  };
}