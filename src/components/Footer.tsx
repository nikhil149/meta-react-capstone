import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-icon">🍋</span>
                            <span className="footer-logo-text">Little Lemon</span>
                        </div>
                        <p className="footer-brand-desc">
                            A family-owned Mediterranean restaurant bringing the best of traditional
                            recipes with a modern twist to the heart of Chicago.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Navigation</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/booking">Reservations</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>📍 123 Lemon Street, Chicago</p>
                        <p>📞 (312) 555-0142</p>
                        <p>✉️ hello@littlelemon.com</p>
                    </div>

                    <div className="footer-section">
                        <h4>Hours</h4>
                        <p>Mon - Fri: 11am - 10pm</p>
                        <p>Sat - Sun: 10am - 11pm</p>
                        <p>Happy Hour: 3pm - 6pm</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Little Lemon. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Instagram">📸</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
