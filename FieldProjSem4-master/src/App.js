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
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;