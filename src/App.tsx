import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage.tsx';

// Code-split secondary routes — keeps the homepage entry chunk small.
// Each page becomes its own JS chunk loaded on demand.
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.tsx'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage.tsx'));
const WritingPage = lazy(() => import('./pages/WritingPage.tsx'));

function RouteFallback() {
  return (
    <div className="bg-chinese-black flex min-h-screen items-center justify-center">
      <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/writing" element={<WritingPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
