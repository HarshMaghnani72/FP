import React from 'react';
import './About.css';
import Footer from '../components/Footer/Footer';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p>From a moment of awareness to a movement of change</p>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="story-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why ParentPlus?</span>
            <h2>The Moment That Changed Everything</h2>
          </div>
          
          <div className="story-content">
            <div className="story-text">
              <p className="lead">
                It started with a train station, unsupervised children, and a realization we couldn't ignore.
              </p>
              
              <div className="story-paragraphs">
                <p>
                  During our regular commutes back home, we began noticing young children playing dangerously close to the railway tracks - 
                  their parents absent, struggling with addiction or forced into sex work. These weren't just passing observations; 
                  they were heartbreaking encounters that kept us awake at night.
                </p>
                
                <p>
                  We realized these children weren't simply "playing" - they were surviving. Their parents, often single mothers battling 
                  unimaginable hardships, lacked the support systems needed to break the cycle. The more we learned, the more compelled 
                  we felt to act.
                </p>
                
                <p>
                  ParentPlus emerged from this urgent need - to create a safety net for single parents and their children, providing 
                  resources, community, and most importantly, hope.
                </p>
              </div>
            </div>
            
            <div className="story-image">
              <div className="image-frame">
                <div className="image-placeholder">
                  {/* Replace with actual image */}
                  <span><img src='/images/train.jpg' className='img'></img></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Purpose</span>
            <h2>Creating Change Through Compassion</h2>
          </div>
          
          <div className="mission-cards">
            <div className="mission-card">
              <div className="card-icon">👁️</div>
              <h3>Awareness</h3>
              <p>
                Opening eyes to the struggles of single parents in marginalized communities, 
                breaking stereotypes about family structures.
              </p>
            </div>
            
            <div className="mission-card">
              <div className="card-icon">🤝</div>
              <h3>Support</h3>
              <p>
                Providing tangible resources from childcare information to job training, 
                tailored for single-parent households.
              </p>
            </div>
            
            <div className="mission-card">
              <div className="card-icon">💞</div>
              <h3>Community</h3>
              <p>
                Building networks where single parents uplift each other, 
                because no one should parent alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Join Us in Making a Difference</h2>
          <p>
            Every child deserves a safe childhood. Every parent deserves support.
            <br />
            Be part of the solution today.
          </p>
          <div className="cta-buttons">
            <a href="/donate" className="cta-button">Donate</a>
            {/* <a href="/volunteer" className="cta-button secondary">Volunteer</a> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;