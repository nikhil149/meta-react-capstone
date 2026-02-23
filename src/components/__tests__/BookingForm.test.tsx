import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BookingForm from '../BookingForm';

const renderForm = () =>
    render(
        <BrowserRouter>
            <BookingForm />
        </BrowserRouter>
    );

describe('BookingForm', () => {
    it('renders the form heading', () => {
        renderForm();
        expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
    });

    it('renders all required form fields', () => {
        renderForm();
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    });

    it('renders inside and outside seating options', () => {
        renderForm();
        expect(screen.getByLabelText(/Inside/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Outside/i)).toBeInTheDocument();
    });

    it('has inside seating selected by default', () => {
        renderForm();
        const insideRadio = screen.getByLabelText(/Inside/i) as HTMLInputElement;
        expect(insideRadio.checked).toBe(true);
    });

    it('can switch between inside and outside seating', async () => {
        renderForm();
        const outsideRadio = screen.getByLabelText(/Outside/i) as HTMLInputElement;
        const insideRadio = screen.getByLabelText(/Inside/i) as HTMLInputElement;

        await userEvent.click(outsideRadio);
        expect(outsideRadio.checked).toBe(true);
        expect(insideRadio.checked).toBe(false);
    });

    it('renders occasion dropdown', () => {
        renderForm();
        expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    });

    it('renders special requests textarea', () => {
        renderForm();
        expect(screen.getByLabelText(/Special Requests/i)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
        renderForm();
        expect(screen.getByText(/Confirm Reservation/)).toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
        renderForm();
        const submitBtn = screen.getByText(/Confirm Reservation/);
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Phone is required')).toBeInTheDocument();
            expect(screen.getByText('Date is required')).toBeInTheDocument();
            expect(screen.getByText('Time is required')).toBeInTheDocument();
        });
    });

    it('shows email validation error for invalid email', async () => {
        renderForm();
        const emailInput = screen.getByLabelText(/Email/i);
        await userEvent.type(emailInput, 'not-an-email');

        const submitBtn = screen.getByText(/Confirm Reservation/);
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Invalid email')).toBeInTheDocument();
        });
    });

    it('clears error when user types in field', async () => {
        renderForm();

        // Submit to trigger errors
        fireEvent.click(screen.getByText(/Confirm Reservation/));
        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
        });

        // Type in name field to clear error
        await userEvent.type(screen.getByLabelText(/Full Name/i), 'John');
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });

    it('allows selecting number of guests', async () => {
        renderForm();
        const guestSelect = screen.getByLabelText(/Number of Guests/i) as HTMLSelectElement;
        await userEvent.selectOptions(guestSelect, '4');
        expect(guestSelect.value).toBe('4');
    });

    it('renders available time slots', () => {
        renderForm();
        const timeSelect = screen.getByLabelText(/Time/i);
        fireEvent.click(timeSelect);
        expect(screen.getByText('11:00 AM')).toBeInTheDocument();
        expect(screen.getByText('7:00 PM')).toBeInTheDocument();
    });
});
