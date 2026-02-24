import BookingForm from '../components/BookingForm';
import './Booking.css';

const Booking = () => {
    return (
        <div className="booking-page">
            <div className="container">
                <header className="booking-hero">
                    <h1 className="section-title">Book a Table</h1>
                    <p>
                        Choose your preferred seating — cozy indoor dining or our beautiful
                        garden patio. We can't wait to welcome you!
                    </p>
                </header>

                <div className="booking-wrapper">
                    <aside className="booking-features">
                        <section className="booking-feature">
                            <div className="booking-feature-icon">🕐</div>
                            <h3 className="booking-feature-title">Flexible Hours</h3>
                            <div className="booking-feature-text">Lunch & dinner slots available daily</div>
                        </section>
                        <section className="booking-feature">
                            <div className="booking-feature-icon">🪑</div>
                            <h3 className="booking-feature-title">Inside & Outside</h3>
                            <div className="booking-feature-text">Choose your perfect seating area</div>
                        </section>
                        <section className="booking-feature">
                            <div className="booking-feature-icon">✅</div>
                            <h3 className="booking-feature-title">Instant Confirm</h3>
                            <div className="booking-feature-text">Get immediate booking confirmation</div>
                        </section>
                    </aside>

                    <BookingForm />
                </div>
            </div>
        </div>
    );
};

export default Booking;
