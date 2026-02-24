import { useState } from 'react';
import BookingForm from '../components/BookingForm';
import './Booking.css';

/**
 * Simulates fetching available time slots for a given date.
 * - Weekends (Sat/Sun) include brunch slots starting at 10:00 AM
 * - Weekdays start at 11:00 AM
 * - A seeded random subset of slots is removed to simulate booked times
 */
const fetchAvailableTimes = (dateString: string): string[] => {
    const allTimes = [
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM', '5:00 PM', '5:30 PM',
        '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
        '8:00 PM', '8:30 PM', '9:00 PM',
    ];

    const brunchTimes = ['10:00 AM', '10:30 AM'];

    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = day === 0 || day === 6;

    const baseTimes = isWeekend ? [...brunchTimes, ...allTimes] : allTimes;

    // Use the date as a seed to deterministically "book" some slots
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    const available = baseTimes.filter((_, index) => {
        const hash = ((seed * 31 + index * 17) % 97);
        return hash % 4 !== 0; // ~25% of slots are "booked"
    });

    return available;
};

const Booking = () => {
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    const handleDateChange = (date: string) => {
        if (date) {
            setAvailableTimes(fetchAvailableTimes(date));
        } else {
            setAvailableTimes([]);
        }
    };

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

                    <BookingForm
                        availableTimes={availableTimes}
                        onDateChange={handleDateChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Booking;
