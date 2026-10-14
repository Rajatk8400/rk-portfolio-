import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import Loader from './Components/Loader.jsx';
import Navbar from './Components/Navbar.jsx';
import PortfolioModal from './Components/PortfolioModal.jsx';
import { portfolioData } from './data/portfolioData';
import './overlay.css';

const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth <= 1000 && window.innerHeight <= 800;
};

export default function PortfolioApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState('all');
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  const handleOpenSection = (section = 'all') => {
    setModalSection(section);
    setModalOpen(true);
  };

  const { personal, experience, projects, skills, education, certifications } = portfolioData;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '100vh', overflow: 'hidden', background: '#020617' }}>
      {/* Top Accessible Navigation */}
      <Navbar onOpenSection={handleOpenSection} />

      {/* Floating Recruiter Action Group on Bottom Right */}
      <div className="rk-fab-group">
        <button
          onClick={() => handleOpenSection('contact')}
          className="rk-btn rk-btn-resume"
          style={{ borderRadius: '9999px', padding: '8px 14px', fontSize: '11px' }}
          aria-label="Direct Contact"
        >
          <span>✉️</span> Hire Rajat
        </button>
        <button
          onClick={() => handleOpenSection('all')}
          className="rk-btn rk-btn-recruiter"
          style={{ borderRadius: '9999px', padding: '10px 18px', fontSize: '12px' }}
          aria-label="Open Recruiter Overview"
        >
          <span>📄</span> Recruiter Overview
        </button>
      </div>

      {/* 3D Canvas */}
      {webGLSupported ? (
        <Canvas
          camera={{
            fov: isMobile() ? 100 : 45,
            near: 0.1,
            far: 200,
            position: [52, 7, 12],
          }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
        >
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </Canvas>
      ) : (
        <div style={{ position: 'relative', zIndex: 10, padding: '120px 24px', textAlign: 'center', color: '#fff' }}>
          <h2>WebGL Hardware Acceleration Not Detected</h2>
          <p style={{ color: '#94a3b8', margin: '12px 0 24px 0' }}>
            Explore the complete interactive profile and resume directly:
          </p>
          <button onClick={() => handleOpenSection('all')} className="rk-btn rk-btn-recruiter">
            Open Full Portfolio
          </button>
        </div>
      )}

      {/* Recruiter Modal */}
      <PortfolioModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSection={modalSection}
      />

      <Analytics />

      {/* Hidden Semantic HTML for Search Engines & Screen Readers */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h1>{personal.name} - {personal.title}</h1>
        <p>{personal.summary}</p>
        <p>{personal.location} - {personal.phone} - {personal.email}</p>
        <ul>
          {experience.map((job, idx) => (
            <li key={idx}>{job.position} at {job.company}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
