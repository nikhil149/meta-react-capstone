import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

const renderFooter = () =>
    render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );

describe('Footer', () => {
    it('renders the brand name', () => {
        renderFooter();
        expect(screen.getByText('Little Lemon')).toBeInTheDocument();
    });

    it('renders the brand description', () => {
        renderFooter();
        expect(screen.getByText(/family-owned Mediterranean restaurant/i)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderFooter();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Menu')).toBeInTheDocument();
        expect(screen.getByText('Reservations')).toBeInTheDocument();
    });

    it('renders contact information', () => {
        renderFooter();
        expect(screen.getByText(/123 Lemon Street/)).toBeInTheDocument();
        expect(screen.getByText(/555-0142/)).toBeInTheDocument();
        expect(screen.getByText(/hello@littlelemon.com/)).toBeInTheDocument();
    });

    it('renders operating hours', () => {
        renderFooter();
        expect(screen.getByText(/Mon - Fri: 11am - 10pm/)).toBeInTheDocument();
        expect(screen.getByText(/Sat - Sun: 10am - 11pm/)).toBeInTheDocument();
    });

    it('renders the copyright notice', () => {
        renderFooter();
        expect(screen.getByText(/© 2026 Little Lemon/)).toBeInTheDocument();
    });

    it('renders social media links with aria labels', () => {
        renderFooter();
        expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
        expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
        expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    });
});
