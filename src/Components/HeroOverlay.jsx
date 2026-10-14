import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function HeroOverlay({ onOpenSection }) {
  const [minimized, setMinimized] = useState(false);
  const { personal } = portfolioData;

  if (minimized) {
    return (
      <div className="rk-hero-hud">
        <button
          onClick={() => setMinimized(false)}
          className="rk-btn rk-btn-resume"
          style={{ borderRadius: '9999px', padding: '8px 14px' }}
        >
          <span>👤</span> {personal.name}
          <span style={{ fontSize: '10px', opacity: 0.8, marginLeft: '4px' }}>Expand</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rk-hero-hud">
      <div className="rk-hero-hud-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <div className="rk-badge-available">
              <span className="rk-pulse-dot" style={{ background: '#34d399', width: '6px', height: '6px' }} />
              Open to Opportunities
            </div>
            <h2 className="rk-hud-title">{personal.name}</h2>
            <p className="rk-hud-subtitle">{personal.title}</p>
          </div>
          <button
            onClick={() => setMinimized(true)}
            aria-label="Minimize HUD"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px',
              fontSize: '14px',
              lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>

        <p className="rk-hud-desc">{personal.summary}</p>

        <div className="rk-hud-actions">
          <button
            onClick={() => onOpenSection('projects')}
            className="rk-btn rk-btn-recruiter"
          >
            View Projects
          </button>
          <a
            href={personal.resumeUrl}
            download={personal.resumeFilename}
            className="rk-btn rk-btn-resume"
          >
            <svg className="rk-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
          <button
            onClick={() => onOpenSection('contact')}
            className="rk-btn"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }}
          >
            Contact
          </button>
        </div>

        <div className="rk-hud-footer">
          <span>🖱️ Scroll to tour 3D Island</span>
          <button onClick={() => onOpenSection('all')}>Full Recruiter View ↗</button>
        </div>
      </div>
    </div>
  );
}
