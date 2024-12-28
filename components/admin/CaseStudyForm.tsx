import React from 'react';
import { useCaseStudies } from '../../hooks/useCaseStudies';
import { Editor } from './Editor';
import type { CaseStudyMetric } from '../../lib/api/case-studies';

interface CaseStudyFormProps {
  caseStudyId?: string;
  onSuccess?: () => void;
}

export default function CaseStudyForm({ caseStudyId, onSuccess }: CaseStudyFormProps) {
  const { createCaseStudy, updateCaseStudy, caseStudies } = useCaseStudies();
  const [error, setError] = React.useState<string>('');
  const [formData, setFormData] = React.useState({
    title: '',
    category: '',
    description: '',
    content: '',
    image_url: '',
    year: new Date().getFullYear().toString(),
    client: '',
    metrics: [{ label: '', value: '' }] as CaseStudyMetric[],
    featured: false,
  });

  // Load existing case study data if editing
  React.useEffect(() => {
    if (caseStudyId && caseStudyId !== 'new' && caseStudies) {
      const caseStudy = caseStudies.find(cs => cs.id === caseStudyId);
      if (caseStudy) {
        setFormData({
          title: caseStudy.title,
          category: caseStudy.category,
          description: caseStudy.description,
          content: caseStudy.content,
          image_url: caseStudy.image_url || '',
          year: caseStudy.year,
          client: caseStudy.client,
          metrics: caseStudy.metrics?.length > 0 ? caseStudy.metrics : [{ label: '', value: '' }],
          featured: caseStudy.featured,
        });
      }
    }
  }, [caseStudyId, caseStudies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Validate required fields
      const requiredFields = ['title', 'category', 'description', 'content', 'year', 'client'] as const;
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
      }

      // Filter out empty metrics
      const cleanedFormData = {
        ...formData,
        metrics: formData.metrics.filter(m => m.label && m.value)
      };

      if (caseStudyId && caseStudyId !== 'new') {
        const result = await updateCaseStudy.mutateAsync({
          id: caseStudyId,
          ...cleanedFormData
        });
        if (!result) throw new Error('Failed to update case study');
      } else {
        const result = await createCaseStudy.mutateAsync(cleanedFormData);
        if (!result) throw new Error('Failed to create case study');
      }

      onSuccess?.();
    } catch (err: any) {
      console.error('Error saving case study:', err);
      setError(err.message || 'Failed to save case study. Please try again.');
    }
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '' }]
    }));
  };

  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index)
    }));
  };

  const updateMetric = (index: number, field: 'label' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Form fields remain the same */}
      {/* ... */}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-50"
        disabled={createCaseStudy.isLoading || updateCaseStudy.isLoading}
      >
        {createCaseStudy.isLoading || updateCaseStudy.isLoading
          ? 'Saving...'
          : caseStudyId && caseStudyId !== 'new'
          ? 'Update Case Study'
          : 'Create Case Study'}
      </button>
    </form>
  );
}