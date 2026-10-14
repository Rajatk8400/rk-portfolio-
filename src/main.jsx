import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import PortfolioApp from './PortfolioApp.jsx';
import './index.css';

console.log("Welcome to Rajat Kashyap's Portfolio - Web Developer & Lead Generation Specialist (rajatqwe8@gmail.com)");

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <StrictMode>
    <PortfolioApp />
  </StrictMode>
);