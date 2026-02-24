import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="navbar-logo">
                    <span className="navbar-logo-icon">🍋</span>
                    <div className="navbar-logo-text">
                        Little Lemon
                        <span>Chicago</span>
                    </div>
                </Link>

                <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/" className={isActive('/')}>Home</Link></li>
                    <li><Link to="/menu" className={isActive('/menu')}>Menu</Link></li>
                    <li><Link to="/booking" className={isActive('/booking')}>Reservations</Link></li>
                    <li><Link to="/booking" className="btn btn-primary navbar-cta">Book a Table</Link></li>
                </ul>

                <button
                    className={`navbar-hamburger ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
