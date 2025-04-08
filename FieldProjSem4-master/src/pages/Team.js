import React from 'react';
import Footer from '../components/Footer/Footer';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Rushil Rohra',
      role: 'Team Leader',
      bio: 'Leading the development of ParentPlus with a vision to support single parents.',
      image: '/images/team1.jpg'
    },
    {
      id: 2,
      name: 'Harshita Bhatia',
      role: 'Backend Engineer',
      bio: 'Building robust backend systems to power the ParentPlus platform.',
      image: '/images/team2.jpg'
    },
    {
      id: 3,
      name: 'Dolly Mangwani',
      role: 'Backend Engineer',
      bio: 'Developing secure and efficient backend services for ParentPlus.',
      image: '/images/team3.jpg'
    },
    {
      id: 4,
      name: 'Anish Udasi',
      role: 'Frontend Engineer',
      bio: 'Creating intuitive and responsive user interfaces for ParentPlus.',
      image: '/images/team4.jpg'
    }
  ];

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="hero-content">
          <h1>Our Team</h1>
          <p>Meet the dedicated individuals behind ParentPlus</p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-grid">
        <div className="section-container">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;