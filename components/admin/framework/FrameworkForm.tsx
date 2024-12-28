import React from 'react';
import { useFrameworks } from '../../../hooks/useFrameworks';
import { Editor } from '../Editor';
import { FormField } from '../case-study/FormField';
import { MetricsField } from '../case-study/MetricsField';
import type { Framework, FrameworkError } from '../../../lib/api/frameworks';

interface FrameworkFormProps {
  frameworkId?: string;
  onSuccess?: () => void;
}

export default function FrameworkForm({ frameworkId, onSuccess }: FrameworkFormProps) {
  const { createFramework, updateFramework, frameworks } = useFrameworks();
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const [formData, setFormData] = React.useState({
    title: '',
    category: '',
    description: '',
    content: '',
    metrics: [{ label: '', value: '' }],
    order_index: 0
  });

  // Load existing framework data if editing
  React.useEffect(() => {
    if (frameworkId && frameworkId !== 'new' && frameworks) {
      const framework = frameworks.find(f => f.id === frameworkId);
      if (framework) {
        setFormData({
          title: framework.title,
          category: framework.category,
          description: framework.description,
          content: framework.content,
          metrics: framework.metrics?.length > 0 ? framework.metrics : [{ label: '', value: '' }],
          order_index: framework.order_index
        });
      }
    }
  }, [frameworkId, frameworks]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is modified
    if (formErrors[field]) {
      setFormErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    try {
      const cleanedFormData = {
        ...formData,
        metrics: formData.metrics.filter(m => m.label && m.value)
      };

      if (frameworkId && frameworkId !== 'new') {
        await updateFramework.mutateAsync({
          id: frameworkId,
          ...cleanedFormData
        });
      } else {
        await createFramework.mutateAsync(cleanedFormData);
      }
      onSuccess?.();
    } catch (err) {
      if (err instanceof FrameworkError && err.errors?.length) {
        // Map validation errors to form fields
        const errors = err.errors.reduce((acc, { field, message }) => ({
          ...acc,
          [field]: message
        }), {});
        setFormErrors(errors);
      } else {
        setFormErrors({ 
          submit: err instanceof Error ? err.message : 'An unexpected error occurred'
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formErrors.submit && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
          {formErrors.submit}
        </div>
      )}

      <FormField label="Title" error={formErrors.title}>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
          required
        />
      </FormField>

      <FormField label="Category" error={formErrors.category}>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
          required
        />
      </FormField>

      <FormField label="Description" error={formErrors.description}>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
          rows={3}
          required
        />
      </FormField>

      <FormField label="Content" error={formErrors.content}>
        <Editor
          value={formData.content}
          onChange={(content) => handleChange('content', content)}
        />
      </FormField>

      <MetricsField
        metrics={formData.metrics}
        onChange={(metrics) => handleChange('metrics', metrics)}
        error={formErrors.metrics}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-50"
        disabled={createFramework.isLoading || updateFramework.isLoading}
      >
        {createFramework.isLoading || updateFramework.isLoading
          ? 'Saving...'
          : frameworkId && frameworkId !== 'new'
          ? 'Update Framework'
          : 'Create Framework'}
      </button>
    </form>
  );
}