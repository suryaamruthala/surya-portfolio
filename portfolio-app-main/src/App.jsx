import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

// A component that handles the /?=surya magic link requirement
const MagicAdminRedirect = ({ children }) => {
  const location = useLocation();
  if (location.search === '?surya=admin' || location.search === '?=surya') {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          
          <main className="flex-grow">
            <MagicAdminRedirect>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Route */}
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
                    <p className="text-xl">Page not found</p>
                  </div>
                } />
              </Routes>
            </MagicAdminRedirect>
          </main>
          
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
