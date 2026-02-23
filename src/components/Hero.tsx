import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title">Little Lemon</h1>
                    <p className="hero-subtitle">Chicago</p>
                    <p className="hero-description">
                        We are a family-owned Mediterranean restaurant, focused on traditional recipes
                        served with a modern twist. Experience the warmth of our kitchen and the
                        freshness of our ingredients.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/booking" className="btn btn-primary">
                            Reserve a Table
                        </Link>
                        <Link to="/menu" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                            View Menu
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <div className="hero-image-main">🍽️</div>
                        <div className="hero-badge">
                            <div className="hero-badge-number">4.8</div>
                            <div className="hero-badge-text">★ Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
