import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Confirmation from '../Confirmation';

interface MockBooking {
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

const mockBooking: MockBooking = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(312) 555-0142',
    date: '2026-03-15',
    time: '7:00 PM',
    guests: '4',
    seating: 'outside',
    occasion: 'birthday',
    notes: 'Window seat preferred',
};

const renderConfirmation = (state?: MockBooking | null) =>
    render(
        <MemoryRouter initialEntries={[{ pathname: '/confirmation', state }]}>
            <Confirmation />
        </MemoryRouter>
    );

describe('Confirmation Page', () => {
    it('renders confirmation heading with booking data', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
    });

    it('displays the guest name in thank you message', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText(/Thank you, John Doe/)).toBeInTheDocument();
    });

    it('displays the formatted date', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText(/March 15, 2026/)).toBeInTheDocument();
    });

    it('displays the time', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText(/7:00 PM/)).toBeInTheDocument();
    });

    it('displays the number of guests', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText(/4 Guests/)).toBeInTheDocument();
    });

    it('displays outside seating when selected', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText(/Outside/)).toBeInTheDocument();
    });

    it('displays inside seating when selected', () => {
        renderConfirmation({ ...mockBooking, seating: 'inside' as const });
        expect(screen.getByText(/Inside/)).toBeInTheDocument();
    });

    it('displays the occasion', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText('Birthday')).toBeInTheDocument();
    });

    it('displays the email', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('displays special requests when provided', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText('Window seat preferred')).toBeInTheDocument();
    });

    it('renders action buttons', () => {
        renderConfirmation(mockBooking);
        expect(screen.getByText('Back to Home')).toBeInTheDocument();
        expect(screen.getByText('View Menu')).toBeInTheDocument();
    });

    it('shows singular Guest for 1 guest', () => {
        renderConfirmation({ ...mockBooking, guests: '1' });
        expect(screen.getByText(/1 Guest/)).toBeInTheDocument();
    });
});
