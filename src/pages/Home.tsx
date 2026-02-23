import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MenuCard from '../components/MenuCard';
import { menuItems } from '../data/menuData';
import './Home.css';

const specials = menuItems.filter(item =>
    ['Greek Salad', 'Lemon Herb Chicken', 'Lemon Dessert'].includes(item.name)
);

const testimonials = [
    {
        stars: 5,
        text: '"The Greek Salad was incredibly fresh, and the Lemon Herb Chicken was cooked to perfection. The ambiance is warm and inviting — truly a gem in Chicago!"',
        name: 'Sarah M.',
        role: 'Regular Customer',
        avatar: '👩',
    },
    {
        stars: 5,
        text: '"Best Mediterranean food in the city! The outdoor patio is beautiful and the staff is always attentive. We come here every weekend for brunch."',
        name: 'James R.',
        role: 'Food Critic',
        avatar: '👨',
    },
    {
        stars: 5,
        text: '"Had my birthday dinner here and it was magical. The Baklava is to die for! The booking process was seamless and the inside seating was perfect."',
        name: 'Emily K.',
        role: 'Birthday Celebrant',
        avatar: '👩‍🦰',
    },
];

const Home = () => {
    return (
        <main>
            <Hero />

            {/* About Section */}
            <section className="home-about">
                <div className="container">
                    <div className="home-about-content">
                        <h2 className="section-title">Our Story</h2>
                        <h3 className="section-subtitle">A Taste of the Mediterranean</h3>
                        <p>
                            Little Lemon was founded in 1995 by two Italian brothers, Mario and Adrian.
                            Inspired by their grandmother's timeless recipes, they brought the warmth of
                            Mediterranean cuisine to the streets of Chicago.
                        </p>
                        <p>
                            Every dish is crafted with love, using only the freshest locally-sourced
                            ingredients and traditional techniques passed down through generations.
                            Our menu evolves with the seasons, but our commitment to quality never changes.
                        </p>
                        <Link to="/menu" className="btn btn-secondary">
                            Explore Our Menu
                        </Link>
                    </div>
                    <div className="home-about-visual">
                        <div className="about-image-card">👨‍🍳</div>
                        <div className="about-image-card">🥘</div>
                        <div className="about-image-card">🍷</div>
                        <div className="about-image-card">🌿</div>
                    </div>
                </div>
            </section>

            {/* Specials Section */}
            <section className="home-specials">
                <div className="container">
                    <div className="specials-header">
                        <div>
                            <h2 className="section-title">This Week's Specials</h2>
                            <p className="section-subtitle">Chef's handpicked favorites</p>
                        </div>
                        <Link to="/menu" className="btn btn-primary">
                            Full Menu →
                        </Link>
                    </div>
                    <div className="specials-grid">
                        {specials.map((item, idx) => (
                            <MenuCard key={item.id} item={item} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="home-testimonials">
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'center' }}>What Our Guests Say</h2>
                    <div className="testimonials-grid">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="testimonial-card">
                                <div className="testimonial-stars">
                                    {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
                                </div>
                                <p className="testimonial-text">{t.text}</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.avatar}</div>
                                    <div>
                                        <div className="testimonial-name">{t.name}</div>
                                        <div className="testimonial-role">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="home-cta">
                <div className="container">
                    <h2>Ready for a Memorable Meal?</h2>
                    <p>Book your table today and experience the finest Mediterranean cuisine Chicago has to offer.</p>
                    <Link to="/booking" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                        Reserve Your Table 🍽️
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Home;
