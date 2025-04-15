import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Team from './pages/Team';
import About from './pages/About';
import Donate from './pages/Donate';
import Payment from './pages/Payment';
import DonationSuccess from './pages/DonationSuccess';
import FAQ from './pages/FAQ';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import AddBlog from './pages/AddBlog';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminFAQ from './pages/AdminFAQ';
import ContactMessages from './pages/admin/ContactMessages';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<About />} />
              <Route path="/donate" element={<Donate />} />
              <Route 
                path="/payment" 
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } 
              />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogPost />} />
              <Route 
                path="/add-blog" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AddBlog />
                  </ProtectedRoute>
                } 
              />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/faq" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminFAQ />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/contact-messages" 
                element={
                  <ProtectedRoute requireAdmin>
                    <ContactMessages />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;