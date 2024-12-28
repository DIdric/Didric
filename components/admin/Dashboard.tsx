import React from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useCaseStudies } from '../../hooks/useCaseStudies';
import { useFrameworks } from '../../hooks/useFrameworks';
import ProjectForm from './ProjectForm';
import CaseStudyForm from './case-study/CaseStudyForm';
import FrameworkForm from './framework/FrameworkForm';
import { Pencil, Trash2 } from 'lucide-react';

export default function Dashboard() {
  const { projects, isLoading: projectsLoading } = useProjects();
  const { caseStudies, isLoading: caseStudiesLoading } = useCaseStudies();
  const { frameworks, isLoading: frameworksLoading } = useFrameworks();
  const [editingProject, setEditingProject] = React.useState<string | null>(null);
  const [editingCaseStudy, setEditingCaseStudy] = React.useState<string | null>(null);
  const [editingFramework, setEditingFramework] = React.useState<string | null>(null);

  if (projectsLoading || caseStudiesLoading || frameworksLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-accent bg-clip-text text-transparent">
          Content Management
        </h1>

        <div className="space-y-12">
          {/* Projects Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <button
                onClick={() => setEditingProject('new')}
                className="px-4 py-2 bg-accent-blue rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Add Project
              </button>
            </div>

            {editingProject && (
              <div className="mb-8 p-6 bg-dark-800 rounded-lg">
                <ProjectForm
                  projectId={editingProject === 'new' ? undefined : editingProject}
                  onSuccess={() => setEditingProject(null)}
                />
              </div>
            )}

            <div className="grid gap-4">
              {projects?.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-dark-800 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProject(project.id)}
                      className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                      title="Edit project"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-red-500"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Case Studies Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Case Studies</h2>
              <button
                onClick={() => setEditingCaseStudy('new')}
                className="px-4 py-2 bg-accent-blue rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Add Case Study
              </button>
            </div>

            {editingCaseStudy && (
              <div className="mb-8 p-6 bg-dark-800 rounded-lg">
                <CaseStudyForm
                  caseStudyId={editingCaseStudy === 'new' ? undefined : editingCaseStudy}
                  onSuccess={() => setEditingCaseStudy(null)}
                />
              </div>
            )}

            <div className="grid gap-4">
              {caseStudies?.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="p-4 bg-dark-800 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{caseStudy.title}</h3>
                    <p className="text-sm text-gray-400">{caseStudy.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCaseStudy(caseStudy.id)}
                      className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                      title="Edit case study"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-red-500"
                      title="Delete case study"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Frameworks Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Frameworks</h2>
              <button
                onClick={() => setEditingFramework('new')}
                className="px-4 py-2 bg-accent-blue rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Add Framework
              </button>
            </div>

            {editingFramework && (
              <div className="mb-8 p-6 bg-dark-800 rounded-lg">
                <FrameworkForm
                  frameworkId={editingFramework === 'new' ? undefined : editingFramework}
                  onSuccess={() => setEditingFramework(null)}
                />
              </div>
            )}

            <div className="grid gap-4">
              {frameworks?.map((framework) => (
                <div
                  key={framework.id}
                  className="p-4 bg-dark-800 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{framework.title}</h3>
                    <p className="text-sm text-gray-400">{framework.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingFramework(framework.id)}
                      className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                      title="Edit framework"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-red-500"
                      title="Delete framework"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}