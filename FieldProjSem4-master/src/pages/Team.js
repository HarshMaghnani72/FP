import React from 'react';
import Footer from '../components/Footer/Footer';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'With over 15 years of experience in social work and community development, Sarah founded ParentPlus to create a supportive network for single parents.',
      image: '/images/team1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Program Director',
      bio: 'Michael brings extensive experience in program management and community outreach, ensuring our initiatives reach those who need them most.',
      image: '/images/team2.jpg'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'Community Manager',
      bio: 'Lisa specializes in building and nurturing communities, creating safe spaces for single parents to connect and support each other.',
      image: '/images/team3.jpg'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Resource Coordinator',
      bio: 'David works tirelessly to connect single parents with essential resources and support services in their communities.',
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