import { Link, useLocation, Navigate } from 'react-router-dom';
import './Confirmation.css';

interface BookingData {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    seating: 'inside' | 'outside';
    occasion: string;
    notes: string;
}

const Confirmation = () => {
    const location = useLocation();
    const booking = location.state as BookingData | null;

    if (!booking) {
        return <Navigate to="/booking" replace />;
    }

    const occasionLabel = booking.occasion === 'none' ? '—' :
        booking.occasion.charAt(0).toUpperCase() + booking.occasion.slice(1);

    const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="confirmation-page">
            <div className="container">
                <div className="confirmation-card">
                    <div className="confirmation-icon">✓</div>
                    <h1>Reservation Confirmed!</h1>
                    <p className="subtitle">
                        Thank you, {booking.name}! Your table has been reserved. We look forward to welcoming you.
                    </p>

                    <dl className="confirmation-details">
                        <div className="confirmation-detail">
                            <dt className="confirmation-detail-label">Date</dt>
                            <dd className="confirmation-detail-value">📅 {formattedDate}</dd>
                        </div>
                        <div className="confirmation-detail">
                            <dt className="confirmation-detail-label">Time</dt>
                            <dd className="confirmation-detail-value">🕐 {booking.time}</dd>
                        </div>
                        <div className="confirmation-detail">
                            <dt className="confirmation-detail-label">Guests</dt>
                            <dd className="confirmation-detail-value">👥 {booking.guests} {Number(booking.guests) === 1 ? 'Guest' : 'Guests'}</dd>
                        </div>
                        <div className="confirmation-detail">
                            <dt className="confirmation-detail-label">Seating</dt>
                            <dd className="confirmation-detail-value">
                                {booking.seating === 'inside' ? '🏠 Inside' : '🌿 Outside'}
                            </dd>
                        </div>
                        <div className="confirmation-detail">
                            <dt className="confirmation-detail-label">Occasion</dt>
                            <dd className="confirmation-detail-value">{occasionLabel}</dd>
                        </div>
                        <div className="confirmation-detail">
                            <dt className="confirmation-detail-label">Email</dt>
                            <dd className="confirmation-detail-value">{booking.email}</dd>
                        </div>
                    </dl>

                    {booking.notes && (
                        <div style={{ textAlign: 'left', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
                                Special Requests
                            </span>
                            <p style={{ marginTop: '4px', color: 'var(--color-text)' }}>{booking.notes}</p>
                        </div>
                    )}

                    <nav className="confirmation-actions" aria-label="Post-confirmation actions">
                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                        <Link to="/menu" className="btn btn-outline">View Menu</Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
