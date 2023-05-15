import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Welcome to MyApp</h1>
        <p>Your one-stop shop for all your product needs</p>
      </div>
      <div className="homepage-content">
        <div className="homepage-section">
          <h2>Frontend Technologies</h2>
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
        </div>
        <div className="homepage-section">
          <h2>Backend Technologies</h2>
          <ul>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>Mongoose</li>
            <li>Axios</li>
          </ul>
        </div>
      </div>
      <div className="homepage-footer">
        <Link to="/products" className="homepage-cta">
          All Products
        </Link>
        <Link to="/products/new" className="homepage-cta">
          Add Product
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
