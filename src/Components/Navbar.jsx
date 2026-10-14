import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenSection }) {
  const { personal } = portfolioData;

  return (
    <header className="rk-navbar">
      <nav aria-label="Main Navigation" className="rk-navbar-inner">
        {/* Brand */}
        <div className="rk-brand">
          <div className="rk-avatar">RK</div>
          <div className="rk-brand-text">
            <h1>{personal.name}</h1>
            <p>{personal.shortTitle}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="rk-nav-actions">
          {/* Quick Nav Links */}
          <div className="rk-nav-menu">
            <button onClick={() => onOpenSection('about')} className="rk-nav-link">About</button>
            <button onClick={() => onOpenSection('experience')} className="rk-nav-link">Experience</button>
            <button onClick={() => onOpenSection('projects')} className="rk-nav-link">Projects</button>
            <button onClick={() => onOpenSection('skills')} className="rk-nav-link">Skills</button>
            <button onClick={() => onOpenSection('education')} className="rk-nav-link">Education</button>
            <button onClick={() => onOpenSection('contact')} className="rk-nav-link">Contact</button>
          </div>

          {/* Download Resume Button */}
          <a
            href={personal.resumeUrl}
            download={personal.resumeFilename}
            className="rk-btn rk-btn-resume"
            title="Download Rajat Kashyap's Resume PDF"
          >
            <svg className="rk-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume PDF
          </a>

          {/* Recruiter Overview Button */}
          <button
            onClick={() => onOpenSection('all')}
            className="rk-btn rk-btn-recruiter"
            aria-label="Open Recruiter Overview"
          >
            <span className="rk-pulse-dot" />
            Recruiter View
          </button>
        </div>
      </nav>
    </header>
  );
}
