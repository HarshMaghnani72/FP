import React, { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Floating shapes animation
    const createShapes = () => {
      const shapes = document.querySelector('.floating-shapes');
      if (!shapes) return;
      
      shapes.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        shape.style.width = `${Math.random() * 150 + 50}px`;
        shape.style.height = shape.style.width;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${Math.random() * 20}s`;
        shapes.appendChild(shape);
      }
    };

    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card, .testimonial-card, .resource-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(el => observer.observe(el));
    };

    createShapes();
    animateOnScroll();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="floating-shapes"></div>
        <div className="hero-content">
          <h1>Supporting Single Parents Every Step of the Way</h1>
          <p>Join our community of strong, resilient parents. Find resources, support, and connection with others who understand your journey.</p>
          <a href="/signup" className="hero-button">Join Our Community</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-container">
          <h2>Our Support Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Access our community forums and chat with other parents anytime, anywhere.</p>
            </div>
            <div className="feature-card">
              <h3>Resource Library</h3>
              <p>Comprehensive guides on parenting, financial planning, and work-life balance.</p>
            </div>
            <div className="feature-card">
              <h3>Local Meetups</h3>
              <p>Connect with other single parents in your area through community events.</p>
            </div>
            <div className="feature-card">
              <h3>Expert Advice</h3>
              <p>Regular webinars with parenting experts, counselors, and financial advisors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="section-container">
          <h2>Stories from Our Community</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote">"This community has been my rock during tough times. The resources and support helped me build a better life for my kids."</div>
              <div className="author">
                <div className="author-info">
                  <h4>Sarah M.</h4>
                  <p>Mother of 2</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote">"The financial planning workshops changed how I manage my money. I'm now more confident about our future."</div>
              <div className="author">
                <div className="author-info">
                  <h4>David K.</h4>
                  <p>Father of 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources" id="resources">
        <div className="section-container">
          <h2>Essential Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Parenting Guides</h3>
              <ul>
                <li>Age-specific parenting tips</li>
                <li>Educational resources</li>
                <li>Behavioral management</li>
              </ul>
              <a href="#" className="resource-link">Learn More →</a>
            </div>
            <div className="resource-card">
              <div className="resource-icon">💰</div>
              <h3>Financial Support</h3>
              <ul>
                <li>Budgeting templates</li>
                <li>Government assistance</li>
                <li>Scholarship programs</li>
              </ul>
              <a href="#" className="resource-link">Learn More →</a>
            </div>
            <div className="resource-card">
              <div className="resource-icon">❤️</div>
              <h3>Emotional Support</h3>
              <ul>
                <li>24/7 helpline</li>
                <li>Support groups</li>
                <li>Professional counseling</li>
              </ul>
              <a href="#" className="resource-link">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="section-container">
          <div className="newsletter-content">
            <h2>Stay Connected</h2>
            <p>Join our newsletter to receive updates, resources, and event invitations.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="button" className="emailbtn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;