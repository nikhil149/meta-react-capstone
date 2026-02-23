import BookingForm from '../components/BookingForm';
import './Booking.css';

const Booking = () => {
    return (
        <main className="booking-page">
            <div className="container">
                <div className="booking-hero">
                    <h1 className="section-title">Book a Table</h1>
                    <p>
                        Choose your preferred seating — cozy indoor dining or our beautiful
                        garden patio. We can't wait to welcome you!
                    </p>
                </div>

                <div className="booking-wrapper">
                    <div className="booking-features">
                        <div className="booking-feature">
                            <div className="booking-feature-icon">🕐</div>
                            <div className="booking-feature-title">Flexible Hours</div>
                            <div className="booking-feature-text">Lunch & dinner slots available daily</div>
                        </div>
                        <div className="booking-feature">
                            <div className="booking-feature-icon">🪑</div>
                            <div className="booking-feature-title">Inside & Outside</div>
                            <div className="booking-feature-text">Choose your perfect seating area</div>
                        </div>
                        <div className="booking-feature">
                            <div className="booking-feature-icon">✅</div>
                            <div className="booking-feature-title">Instant Confirm</div>
                            <div className="booking-feature-text">Get immediate booking confirmation</div>
                        </div>
                    </div>

                    <BookingForm />
                </div>
            </div>
        </main>
    );
};

export default Booking;
