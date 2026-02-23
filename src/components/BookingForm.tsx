import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

interface FormData {
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

interface FormErrors {
    [key: string]: string;
}

const BookingForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        seating: 'inside',
        occasion: 'none',
        notes: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const today = new Date().toISOString().split('T')[0];

    const availableTimes = [
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM', '5:00 PM', '5:30 PM',
        '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
        '8:00 PM', '8:30 PM', '9:00 PM',
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            navigate('/confirmation', { state: formData });
        }
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <h2>Reserve Your Table</h2>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="(312) 555-0142"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <select id="guests" name="guests" value={formData.guests} onChange={handleChange}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                    />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <select id="time" name="time" value={formData.time} onChange={handleChange}>
                        <option value="">Select a time</option>
                        {availableTimes.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    {errors.time && <span className="form-error">{errors.time}</span>}
                </div>

                <div className="seating-toggle">
                    <label>Seating Preference</label>
                    <div className="seating-options">
                        <div className="seating-option">
                            <input
                                type="radio"
                                id="inside"
                                name="seating"
                                value="inside"
                                checked={formData.seating === 'inside'}
                                onChange={handleChange}
                            />
                            <label htmlFor="inside" className="seating-option-label">
                                <span className="seating-option-icon">🏠</span>
                                <span className="seating-option-title">Inside</span>
                                <span className="seating-option-desc">
                                    Cozy indoor dining with ambient lighting &amp; AC
                                </span>
                            </label>
                        </div>
                        <div className="seating-option">
                            <input
                                type="radio"
                                id="outside"
                                name="seating"
                                value="outside"
                                checked={formData.seating === 'outside'}
                                onChange={handleChange}
                            />
                            <label htmlFor="outside" className="seating-option-label">
                                <span className="seating-option-icon">🌿</span>
                                <span className="seating-option-title">Outside</span>
                                <span className="seating-option-desc">
                                    Beautiful patio with garden views &amp; fresh air
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="occasion">Occasion</label>
                    <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
                        <option value="none">No special occasion</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="date">Date Night</option>
                        <option value="business">Business Dinner</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Special Requests</label>
                    <textarea
                        id="notes"
                        name="notes"
                        placeholder="Any dietary restrictions or special requests..."
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className="form-submit">
                    <button type="submit" className="btn btn-primary">
                        Confirm Reservation ✨
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BookingForm;
