import React from 'react';
import { useProjects } from '../../hooks/useProjects';

interface ProjectFormProps {
  projectId?: string;
  onSuccess?: () => void;
}

export default function ProjectForm({ projectId, onSuccess }: ProjectFormProps) {
  const { createProject, updateProject, projects } = useProjects();
  const [error, setError] = React.useState<string>('');
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    image_url: '',
    github_url: '',
    demo_url: '',
    technologies: [] as string[],
    featured: false,
  });

  // Load existing project data if editing
  React.useEffect(() => {
    if (projectId && projectId !== 'new' && projects) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          image_url: project.image_url || '',
          github_url: project.github_url || '',
          demo_url: project.demo_url || '',
          technologies: project.technologies || [],
          featured: project.featured,
        });
      }
    }
  }, [projectId, projects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (projectId && projectId !== 'new') {
        await updateProject.mutateAsync({ id: projectId, ...formData });
      } else {
        await createProject.mutateAsync(formData);
      }
      onSuccess?.();
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err.message || 'Failed to save project. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Image URL</label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">GitHub URL</label>
        <input
          type="url"
          value={formData.github_url}
          onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Demo URL</label>
        <input
          type="url"
          value={formData.demo_url}
          onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
          className="mt-1 block w-full rounded-md bg-dark-700 border-dark-600 text-gray-200"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded bg-dark-700 border-dark-600"
          />
          <span className="ml-2 text-sm text-gray-200">Featured Project</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-opacity-80 transition-colors"
        disabled={createProject.isLoading || updateProject.isLoading}
      >
        {createProject.isLoading || updateProject.isLoading
          ? 'Saving...'
          : projectId && projectId !== 'new'
          ? 'Update Project'
          : 'Create Project'}
      </button>
    </form>
  );
}