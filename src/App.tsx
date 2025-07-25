import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}
