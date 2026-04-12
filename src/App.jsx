import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CustomCursor } from './components/CustomCursor';
import { StardustBackground } from './components/StardustBackground';
import { PageTransition } from './components/PageTransition';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

// Scroll progress bar (fixed at top)
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
    />
  );
};

// Magic link redirect — needs useLocation so must be inside Router
const MagicAdminRedirect = ({ children }) => {
  const location = useLocation();
  if (location.search === '?surya=admin' || location.search === '?=surya') {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

// Inner app that consumes router context
const AppInner = () => {
  return (
    <>
      <CustomCursor />
      <StardustBackground />
      <ScrollProgressBar />

      <div className="relative z-[1] min-h-screen flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow relative z-10">
          <MagicAdminRedirect>
            <PageTransition>
              <Routes>
                <Route path="/"         element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/login"    element={<LoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <div className="flex flex-col items-center justify-center py-20">
                      <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
                      <p className="text-xl">Page not found</p>
                    </div>
                  }
                />
              </Routes>
            </PageTransition>
          </MagicAdminRedirect>
        </main>

        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </Router>
  );
}

export default App;
