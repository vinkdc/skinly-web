import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-text">Skinly</div>
            <p className="footer-brand-caption">
              A VALORANT companion that tracks your cosmetic usage — what you equipped, when, and for how long.
            </p>
          </div>

          <div>
            <div className="footer-heading">Product</div>
            <ul className="footer-links">
              <li><a href="/#features">Features</a></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/#preview">Preview</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Legal</div>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">
            Skinly isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games
            or anyone officially involved in producing or managing Riot Games properties. Riot Games,
            and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </p>
          <p className="footer-copyright">© {year} Skinly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
