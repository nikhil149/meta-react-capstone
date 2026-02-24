import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import BookingForm from '../BookingForm';

const mockOnDateChange = vi.fn();

const renderForm = (availableTimes: string[] = []) =>
    render(
        <BrowserRouter>
            <BookingForm availableTimes={availableTimes} onDateChange={mockOnDateChange} />
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

    it('disables time select when no date is selected', () => {
        renderForm();
        const timeSelect = screen.getByLabelText(/Time/i) as HTMLSelectElement;
        expect(timeSelect.disabled).toBe(true);
        expect(screen.getByText('Pick a date first')).toBeInTheDocument();
    });

    it('renders available time slots when provided via props', () => {
        renderForm(['11:00 AM', '12:00 PM', '7:00 PM']);
        const timeSelect = screen.getByLabelText(/Time/i) as HTMLSelectElement;
        expect(screen.getByText('11:00 AM')).toBeInTheDocument();
        expect(screen.getByText('12:00 PM')).toBeInTheDocument();
        expect(screen.getByText('7:00 PM')).toBeInTheDocument();

        const options = timeSelect.querySelectorAll('option');
        expect(options.length).toBe(4); // 3 time slots + 1 placeholder
    });

    it('calls onDateChange when date is selected', async () => {
        renderForm();
        const dateInput = screen.getByLabelText(/Date/i);
        fireEvent.change(dateInput, { target: { value: '2026-03-10' } });
        expect(mockOnDateChange).toHaveBeenCalledWith('2026-03-10');
    });

    it('shows validation error on blur for empty required fields', () => {
        renderForm();
        const nameInput = screen.getByLabelText(/Full Name/i);
        fireEvent.blur(nameInput);
        expect(screen.getByText('Name is required')).toBeInTheDocument();

        const phoneInput = screen.getByLabelText(/Phone/i);
        fireEvent.blur(phoneInput);
        expect(screen.getByText('Phone is required')).toBeInTheDocument();
    });

    it('shows email format error on blur for invalid email', async () => {
        renderForm();
        const emailInput = screen.getByLabelText(/Email/i);
        await userEvent.type(emailInput, 'not-an-email');
        fireEvent.blur(emailInput);
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('shows error when name is less than 3 characters', async () => {
        renderForm();
        const nameInput = screen.getByLabelText(/Full Name/i);
        await userEvent.type(nameInput, 'Jo');
        fireEvent.blur(nameInput);
        expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument();
    });

    it('accepts name with 3 or more characters', async () => {
        renderForm();
        const nameInput = screen.getByLabelText(/Full Name/i);
        await userEvent.type(nameInput, 'Joe');
        fireEvent.blur(nameInput);
        expect(screen.queryByText('Name must be at least 3 characters')).not.toBeInTheDocument();
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });

    it('shows error for invalid US phone number', async () => {
        renderForm();
        const phoneInput = screen.getByLabelText(/Phone/i);
        await userEvent.type(phoneInput, '123');
        fireEvent.blur(phoneInput);
        expect(screen.getByText('Enter a valid 10-digit US phone number')).toBeInTheDocument();
    });

    it('accepts valid US phone number formats', async () => {
        renderForm();
        const phoneInput = screen.getByLabelText(/Phone/i);
        await userEvent.type(phoneInput, '(312) 555-0142');
        fireEvent.blur(phoneInput);
        expect(screen.queryByText('Enter a valid 10-digit US phone number')).not.toBeInTheDocument();
        expect(screen.queryByText('Phone is required')).not.toBeInTheDocument();
    });
});
