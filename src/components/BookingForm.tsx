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

interface BookingFormProps {
    availableTimes: string[];
    onDateChange: (date: string) => void;
}

const BookingForm = ({ availableTimes, onDateChange }: BookingFormProps) => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Notify parent when date changes so it can update available times
        if (name === 'date') {
            onDateChange(value);
            // Reset selected time since available slots may have changed
            setFormData(prev => ({ ...prev, [name]: value, time: '' }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 3) return 'Name must be at least 3 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email';
                return '';
            case 'phone': {
                if (!value.trim()) return 'Phone is required';
                const digits = value.replace(/\D/g, '');
                if (digits.length !== 10) return 'Enter a valid 10-digit US phone number';
                return '';
            }
            case 'date':
                return !value ? 'Date is required' : '';
            case 'time':
                return !value ? 'Time is required' : '';
            default:
                return '';
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        const fieldsToValidate = ['name', 'email', 'phone', 'date', 'time'] as const;
        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                    />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!formData.date}
                    >
                        <option value="">
                            {!formData.date
                                ? 'Pick a date first'
                                : availableTimes.length === 0
                                    ? 'No slots available'
                                    : `Select a time (${availableTimes.length} slots)`}
                        </option>
                        {availableTimes.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    {errors.time && <span className="form-error">{errors.time}</span>}
                </div>

                <fieldset className="seating-toggle">
                    <legend>Seating Preference</legend>
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
                </fieldset>

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
