import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function PortfolioModal({ isOpen, onClose, initialSection = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialSection);

  useEffect(() => {
    setActiveTab(initialSection);
  }, [initialSection]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { personal, experience, projects, skills, education, certifications } = portfolioData;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
      className="rk-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="rk-modal-box">
        {/* Header */}
        <div className="rk-modal-top">
          <div className="rk-modal-title-area">
            <div className="rk-avatar">RK</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 id="portfolio-modal-title" style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                  {personal.name}
                </h2>
                <span className="rk-chip" style={{ fontSize: '10px' }}>Verified Resume</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--rk-text-muted)', margin: '2px 0 0 0' }}>
                {personal.title}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={personal.resumeUrl}
              download={personal.resumeFilename}
              className="rk-btn rk-btn-resume"
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              <svg className="rk-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="rk-modal-close-btn"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="rk-tab-bar">
          {[
            { id: 'all', label: 'All Overview' },
            { id: 'about', label: 'About Me' },
            { id: 'experience', label: 'Work Experience' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Technical Skills' },
            { id: 'education', label: 'Education & Certs' },
            { id: 'contact', label: 'Contact' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rk-tab-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="rk-modal-content">
          {/* About / Summary Banner */}
          {(activeTab === 'all' || activeTab === 'about') && (
            <section className="rk-section-banner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>
                    {personal.name}
                  </h3>
                  <p style={{ color: 'var(--rk-cyan)', fontSize: '13px', fontWeight: 600, margin: 0 }}>
                    {personal.title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--rk-text-muted)', margin: '4px 0 0 0' }}>
                    📍 {personal.location} • ⏱️ {personal.experienceYears} Experience
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a href={`mailto:${personal.email}`} className="rk-btn rk-btn-recruiter" style={{ padding: '6px 12px', fontSize: '11px' }}>
                    ✉️ {personal.email}
                  </a>
                  <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="rk-btn rk-btn-resume" style={{ padding: '6px 12px', fontSize: '11px' }}>
                    📞 {personal.phone}
                  </a>
                </div>
              </div>

              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#e2e8f0', margin: '16px 0 0 0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                {personal.summary}
              </p>

              <div className="rk-stats-grid">
                <div className="rk-stat-card">
                  <span>Professional Track</span>
                  <strong>6+ Years Experience</strong>
                </div>
                <div className="rk-stat-card">
                  <span>B2B Lead Generation</span>
                  <strong>Thousands Targeted Leads</strong>
                </div>
                <div className="rk-stat-card">
                  <span>Web & Frontend</span>
                  <strong>React JS, HTML, CSS, PHP</strong>
                </div>
                <div className="rk-stat-card">
                  <span>Academic Degree</span>
                  <strong>BCA (CSJM University)</strong>
                </div>
              </div>
            </section>
          )}

          {/* Work Experience */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <section>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                💼 Professional Experience
              </h3>
              <div className="rk-card-list">
                {experience.map((job, idx) => (
                  <div key={idx} className="rk-job-card">
                    <div className="rk-job-header">
                      <div>
                        <h3>{job.position}</h3>
                        <p>{job.company} — <span style={{ color: 'var(--rk-text-muted)', fontWeight: 400 }}>{job.location}</span></p>
                      </div>
                      <span className="rk-date-badge">📅 {job.period}</span>
                    </div>

                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--rk-cyan)', margin: '10px 0 4px 0' }}>
                      Key Responsibilities:
                    </p>
                    <ul className="rk-bullet-list">
                      {job.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>

                    {job.achievements && (
                      <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#34d399', margin: '0 0 4px 0' }}>
                          Key Achievements:
                        </p>
                        <ul className="rk-bullet-list" style={{ color: '#6ee7b7' }}>
                          {job.achievements.map((ach, aIdx) => (
                            <li key={aIdx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="rk-chips">
                      {job.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="rk-chip">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {(activeTab === 'all' || activeTab === 'projects') && (
            <section>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                🚀 Projects & Practical Work
              </h3>
              <div className="rk-project-grid">
                {projects.map((proj, idx) => (
                  <div key={idx} className="rk-project-card">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>{proj.title}</h4>
                        <span className="rk-chip" style={{ fontSize: '9px', textTransform: 'uppercase' }}>{proj.category}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--rk-cyan)', fontWeight: 600, margin: '4px 0 8px 0' }}>
                        Role: {proj.role}
                      </p>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                        {proj.description}
                      </p>
                      {proj.highlights && (
                        <ul className="rk-bullet-list" style={{ fontSize: '12px', margin: '8px 0 0 0' }}>
                          {proj.highlights.map((h, hIdx) => (
                            <li key={hIdx}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="rk-chips">
                        {proj.technologies.map((t, tIdx) => (
                          <span key={tIdx} className="rk-chip" style={{ fontSize: '10px' }}>{t}</span>
                        ))}
                      </div>
                      {proj.demoUrl && (
                        <div style={{ marginTop: '8px' }}>
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '12px', color: 'var(--rk-cyan)', fontWeight: 600, textDecoration: 'none' }}
                          >
                            🔗 View Live Website →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          {(activeTab === 'all' || activeTab === 'skills') && (
            <section>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                ⚡ Technical Skills & Competencies
              </h3>
              <div className="rk-skill-category-grid">
                <div className="rk-skill-box">
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rk-cyan)', margin: '0 0 10px 0' }}>
                    💻 Frontend Development
                  </h4>
                  {skills.frontend.map((item, idx) => (
                    <div key={idx} className="rk-skill-item">
                      <span>{item.name}</span>
                      <span className="rk-skill-level">{item.level}</span>
                    </div>
                  ))}
                </div>

                <div className="rk-skill-box">
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rk-cyan)', margin: '0 0 10px 0' }}>
                    📈 Lead Gen & Outreach
                  </h4>
                  {skills.leadGenerationAndMarketing.map((item, idx) => (
                    <div key={idx} className="rk-skill-item">
                      <span>{item.name}</span>
                      <span className="rk-skill-level">{item.level}</span>
                    </div>
                  ))}
                </div>

                <div className="rk-skill-box">
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rk-cyan)', margin: '0 0 10px 0' }}>
                    ⚙️ Web Engineering & Scripting
                  </h4>
                  {skills.backendAndScripting.map((item, idx) => (
                    <div key={idx} className="rk-skill-item">
                      <span>{item.name}</span>
                      <span className="rk-skill-level">{item.level}</span>
                    </div>
                  ))}
                </div>

                <div className="rk-skill-box" style={{ gridColumn: '1 / -1' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rk-cyan)', margin: '0 0 10px 0' }}>
                    🛠️ Tools, Platforms & Software
                  </h4>
                  <div className="rk-chips">
                    {skills.tools.map((tool, idx) => (
                      <span key={idx} className="rk-chip" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        <strong style={{ color: '#fff' }}>{tool.name}</strong> ({tool.category})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Education & Certs */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <section>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                🎓 Academic Education & Certifications
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="rk-card-list">
                  <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--rk-text-dim)', letterSpacing: '0.8px', margin: 0 }}>
                    Academic Qualifications
                  </h4>
                  {education.map((edu, idx) => (
                    <div key={idx} className="rk-job-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0 }}>{edu.degree}</h4>
                        <span className="rk-date-badge">{edu.year}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--rk-cyan)', margin: '4px 0 0 0' }}>{edu.institution}</p>
                    </div>
                  ))}
                </div>

                <div className="rk-card-list">
                  <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--rk-text-dim)', letterSpacing: '0.8px', margin: 0 }}>
                    Professional Certification
                  </h4>
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="rk-job-card" style={{ borderColor: 'var(--rk-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '20px' }}>🏆</span>
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0 }}>{cert.title}</h4>
                          <p style={{ fontSize: '12px', color: 'var(--rk-cyan)', margin: '2px 0 0 0' }}>{cert.issuer}</p>
                        </div>
                      </div>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5, margin: '8px 0 0 0' }}>
                        {cert.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Contact */}
          {(activeTab === 'all' || activeTab === 'contact') && (
            <section className="rk-section-banner" style={{ textAlign: 'center', padding: '32px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>
                Let's Connect & Discuss Opportunities
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--rk-text-muted)', maxWidth: '540px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                Available for Lead Generation Executive, Email Marketing Specialist, and Web Development roles. Contact me directly:
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`mailto:${personal.email}`} className="rk-btn rk-btn-recruiter">
                  ✉️ Email: {personal.email}
                </a>
                <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="rk-btn rk-btn-resume">
                  📞 Call: {personal.phone}
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="rk-btn" style={{ background: '#0a66c2', color: '#fff' }}>
                  LinkedIn Profile
                </a>
                {personal.github && (
                  <a href={personal.github} target="_blank" rel="noopener noreferrer" className="rk-btn" style={{ background: '#24292e', color: '#fff' }}>
                    🐙 GitHub
                  </a>
                )}
                {personal.instagram && (
                  <a href={personal.instagram} target="_blank" rel="noopener noreferrer" className="rk-btn" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff' }}>
                    📸 Instagram
                  </a>
                )}
                {personal.telegram && (
                  <a href={personal.telegram} target="_blank" rel="noopener noreferrer" className="rk-btn" style={{ background: '#229ED9', color: '#fff' }}>
                    ✈️ Telegram
                  </a>
                )}
                <a href={personal.resumeUrl} download={personal.resumeFilename} className="rk-btn" style={{ background: '#059669', color: '#fff' }}>
                  📄 Download CV (PDF)
                </a>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="rk-modal-footer">
          <span>© {new Date().getFullYear()} {personal.name} • Verified Profile</span>
          <span style={{ color: 'var(--rk-text-dim)' }}>Interactive 3D Portfolio</span>
        </div>
      </div>
    </div>
  );
}
