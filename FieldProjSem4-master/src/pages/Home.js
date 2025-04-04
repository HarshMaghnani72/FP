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
      <section className="testimonials">
        <div className="section-container">
          <h2>What Our Community Says</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"ParentPlus has been a lifeline for me. The resources and support have helped me navigate single parenting with confidence."</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/testimonial1.jpg" alt="Sarah M." />
                <div>
                  <h4>Sarah M.</h4>
                  <p>Single mother of two</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The financial planning tools and advice have been invaluable. I've learned how to budget effectively and save for my children's future."</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/testimonial2.jpg" alt="Michael R." />
                <div>
                  <h4>Michael R.</h4>
                  <p>Single father of one</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The community events have helped me build a support network. It's comforting to know I'm not alone in this journey."</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/testimonial3.jpg" alt="Jennifer L." />
                <div>
                  <h4>Jennifer L.</h4>
                  <p>Single mother of three</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources">
        <div className="section-container">
          <h2>Featured Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">
                <img src="/images/guide-icon.png" alt="Guide" />
              </div>
              <h3>Single Parenting Guide</h3>
              <p>Comprehensive guide covering all aspects of single parenting.</p>
              <a href="/resources/guide" className="resource-link">Read More</a>
            </div>
            <div className="resource-card">
              <div className="resource-icon">
                <img src="/images/budget-icon.png" alt="Budget" />
              </div>
              <h3>Budgeting Tools</h3>
              <p>Financial planning resources and calculators for single parents.</p>
              <a href="/resources/budget" className="resource-link">Read More</a>
            </div>
            <div className="resource-card">
              <div className="resource-icon">
                <img src="/images/legal-icon.png" alt="Legal" />
              </div>
              <h3>Legal Resources</h3>
              <p>Information about custody, child support, and legal rights.</p>
              <a href="/resources/legal" className="resource-link">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="section-container">
          <h2>Join Our Community Today</h2>
          <p>Get access to resources, support, and connect with other single parents.</p>
          <div className="cta-buttons">
            <a href="/signup" className="cta-button primary">Sign Up Now</a>
            <a href="/donate" className="cta-button secondary">Make a Donation</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;