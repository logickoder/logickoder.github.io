import useAnalytics from './useAnalytics.ts';
import { useState } from 'react';
import { Project } from '../data/projects.ts';
import email from '../data/email.ts';

export default function useProjectActions() {
  const { trackExternalLink } = useAnalytics();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = () => {
    trackExternalLink('email', email);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return {
    selectedProject,
    isModalOpen,
    handleContactClick,
    handleProjectClick,
    handleCloseModal,
  };
}