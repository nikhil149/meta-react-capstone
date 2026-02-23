import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from '../Navbar';

const renderNavbar = () =>
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );

describe('Navbar', () => {
    it('renders the logo with restaurant name', () => {
        renderNavbar();
        expect(screen.getByText('Little Lemon')).toBeInTheDocument();
        expect(screen.getByText('Chicago')).toBeInTheDocument();
    });

    it('renders the lemon emoji icon', () => {
        renderNavbar();
        expect(screen.getByText('🍋')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderNavbar();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Menu')).toBeInTheDocument();
        expect(screen.getByText('Reservations')).toBeInTheDocument();
    });

    it('renders the Book a Table CTA button', () => {
        renderNavbar();
        expect(screen.getByText('Book a Table')).toBeInTheDocument();
    });

    it('has correct link destinations', () => {
        renderNavbar();
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Menu').closest('a')).toHaveAttribute('href', '/menu');
        expect(screen.getByText('Reservations').closest('a')).toHaveAttribute('href', '/booking');
    });

    it('toggles hamburger menu on click', () => {
        renderNavbar();
        const hamburger = screen.getByLabelText('Toggle menu');
        fireEvent.click(hamburger);
        expect(hamburger).toHaveClass('open');
        fireEvent.click(hamburger);
        expect(hamburger).not.toHaveClass('open');
    });
});
