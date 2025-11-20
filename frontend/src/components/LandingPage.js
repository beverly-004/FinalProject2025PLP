import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (

    <div className="landing-container fade-in">


      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="overlay"></div>
        <img
          src="/images/Water.jpg"
          alt="Water Background"
          className="hero-bg"
        />
<div className="min-h-screen bg-white dark:bg-gray-950 transition pt-20">
        <div className="hero-content">
          <h1>Your Water Your Way</h1>
          <p>Democratizing access to clean water for communities everywhere.</p>

          <Link to="/about">
            <button className="hero-btn">Learn More</button>
          </Link>
        </div>
        </div>
      </section>
      {/* ===== FEATURES SECTION ===== */}
<section className="features-section">
  <h2 className="section-title">The AquaLink Water Efficiency System</h2>
  <p className="subtitle">
    Track safe water points, monitor queues, predict availability, and access
    clean water easier than ever before.
  </p>

  {/* === GRID CONTAINER (FIXED) === */}
  <div className="feature-grid">

    {/* ===== FEATURE CARD 1 ===== */}
    <div className="flip-card">
      <div className="flip-inner">

        <div className="flip-front">
          <img src="/images/money.jpg" className="icon" alt="Save Money" />
          <h3>Save Money</h3>
          <p>Avoid wasted trips to closed taps.</p>
        </div>

        <div className="flip-back">
          <p>Real-time status helps you avoid unnecessary travel and costs.</p>
        </div>

      </div>
    </div>

    {/* ===== FEATURE CARD 2 ===== */}
    <div className="flip-card">
      <div className="flip-inner">

        <div className="flip-front">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3524/3524636.png"
            className="icon"
            alt="Save Time"
          />
          <h3>Save Time</h3>
          <p>Check queue levels instantly.</p>
        </div>

        <div className="flip-back">
          <p>Know the best times to fetch water using predictive insights.</p>
        </div>

      </div>
    </div>

    {/* ===== FEATURE CARD 3 ===== */}
    <div className="flip-card">
      <div className="flip-inner">

        <div className="flip-front">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966483.png"
            className="icon"
            alt="Stay Healthy"
          />
          <h3>Stay Healthy</h3>
          <p>Know which taps are safe to use.</p>
        </div>

        <div className="flip-back">
          <p>View community-validated safety ratings for each water point.</p>
        </div>

      </div>
    </div>

    {/* ===== FEATURE CARD 4 ===== */}
    <div className="flip-card">
      <div className="flip-inner">

        <div className="flip-front">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
            className="icon"
            alt="Predictions"
          />
          <h3>Smart Predictions</h3>
          <p>Understand patterns & best times.</p>
        </div>

        <div className="flip-back">
          <p>Machine-learning trend analysis gives accurate water forecasts.</p>
        </div>

      </div>
    </div>

  </div>
</section>


  

     

    </div>
  );
}
