import React from 'react';
import './TeamSection.css';

const TeamSection = () => {
  const teamMembers = [
    { 
      id: 1, 
      name: "Rushil Rohra", 
      role: "Team Leader", 
      bio: "Leading the development of ParentPlus with a vision to support single parents.",
      image: "/images/team1.jpg" 
    },
    { 
      id: 2, 
      name: "Harshita Bhatia", 
      role: "Backend Engineer", 
      bio: "Building robust backend systems to power the ParentPlus platform.",
      image: "/images/team2.jpg" 
    },
    { 
      id: 3, 
      name: "Dolly Mangwani", 
      role: "Backend Engineer", 
      bio: "Developing secure and efficient backend services for ParentPlus.",
      image: "/images/team3.jpg" 
    },
    { 
      id: 4, 
      name: "Anish Udasi", 
      role: "Frontend Engineer", 
      bio: "Creating intuitive and responsive user interfaces for ParentPlus.",
      image: "/images/team4.jpg" 
    }
  ];

  return (
    <section className="team-section">
      <div className="container">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="member-image">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  onError={(e) => {
                    console.error(`Failed to load image for ${member.name}:`, e);
                    e.target.onerror = null; 
                    e.target.src = "/images/placeholder.jpg"
                  }}
                />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 