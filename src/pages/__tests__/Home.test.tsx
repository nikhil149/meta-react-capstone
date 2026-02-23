import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from '../Home';

const renderHome = () =>
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

describe('Home Page', () => {
    it('renders the hero section', () => {
        renderHome();
        expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
    });

    it('renders the Our Story section', () => {
        renderHome();
        expect(screen.getByText('Our Story')).toBeInTheDocument();
        expect(screen.getByText('A Taste of the Mediterranean')).toBeInTheDocument();
    });

    it('renders the about description', () => {
        renderHome();
        expect(screen.getByText(/founded in 1995/i)).toBeInTheDocument();
    });

    it('renders the specials section with title', () => {
        renderHome();
        expect(screen.getByText("This Week's Specials")).toBeInTheDocument();
        expect(screen.getByText("Chef's handpicked favorites")).toBeInTheDocument();
    });

    it('renders specials menu cards', () => {
        renderHome();
        expect(screen.getByText('Greek Salad')).toBeInTheDocument();
        expect(screen.getByText('Lemon Herb Chicken')).toBeInTheDocument();
        expect(screen.getByText('Lemon Dessert')).toBeInTheDocument();
    });

    it('renders the testimonials section', () => {
        renderHome();
        expect(screen.getByText('What Our Guests Say')).toBeInTheDocument();
    });

    it('renders testimonial cards with authors', () => {
        renderHome();
        expect(screen.getByText('Sarah M.')).toBeInTheDocument();
        expect(screen.getByText('James R.')).toBeInTheDocument();
        expect(screen.getByText('Emily K.')).toBeInTheDocument();
    });

    it('renders the CTA section', () => {
        renderHome();
        expect(screen.getByText('Ready for a Memorable Meal?')).toBeInTheDocument();
    });

    it('renders explore menu link', () => {
        renderHome();
        expect(screen.getByText('Explore Our Menu')).toBeInTheDocument();
    });
});
