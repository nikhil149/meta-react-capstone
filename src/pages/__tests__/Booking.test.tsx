import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Booking from '../Booking';

const renderBooking = () =>
    render(
        <BrowserRouter>
            <Booking />
        </BrowserRouter>
    );

describe('Booking Page', () => {
    it('renders the page title', () => {
        renderBooking();
        expect(screen.getByText('Book a Table')).toBeInTheDocument();
    });

    it('renders the page description', () => {
        renderBooking();
        expect(screen.getByText(/Choose your preferred seating/i)).toBeInTheDocument();
    });

    it('renders the feature cards', () => {
        renderBooking();
        expect(screen.getByText('Flexible Hours')).toBeInTheDocument();
        expect(screen.getByText('Inside & Outside')).toBeInTheDocument();
        expect(screen.getByText('Instant Confirm')).toBeInTheDocument();
    });

    it('renders the booking form', () => {
        renderBooking();
        expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
    });

    it('renders the seating toggle inside the form', () => {
        renderBooking();
        expect(screen.getByLabelText(/Inside/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Outside/i)).toBeInTheDocument();
    });
});
