import React from 'react';
import type { CaseStudyMetric } from '../../../lib/api/case-studies';

interface MetricsFieldProps {
  metrics: CaseStudyMetric[];
  onChange: (metrics: CaseStudyMetric[]) => void;
  error?: string;
}

export function MetricsField({ metrics, onChange, error }: MetricsFieldProps) {
  const addMetric = () => {
    onChange([...metrics, { label: '', value: '' }]);
  };

  const removeMetric = (index: number) => {
    onChange(metrics.filter((_, i) => i !== index));
  };

  const updateMetric = (index: number, field: keyof CaseStudyMetric, value: string) => {
    onChange(
      metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-200">Metrics</label>
        <button
          type="button"
          onClick={addMetric}
          className="text-sm text-accent-blue hover:text-accent-blue/80"
        >
          Add Metric
        </button>
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={metric.label}
              onChange={(e) => updateMetric(index, 'label', e.target.value)}
              placeholder="Label"
              className={`flex-1 rounded-md bg-dark-700 border-dark-600 text-gray-200 ${
                error ? 'border-red-500' : ''
              }`}
            />
            <input
              type="text"
              value={metric.value}
              onChange={(e) => updateMetric(index, 'value', e.target.value)}
              placeholder="Value"
              className={`flex-1 rounded-md bg-dark-700 border-dark-600 text-gray-200 ${
                error ? 'border-red-500' : ''
              }`}
            />
            {metrics.length > 1 && (
              <button
                type="button"
                onClick={() => removeMetric(index)}
                className="px-3 text-red-500 hover:text-red-400"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}