import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

const renderHero = () =>
    render(
        <BrowserRouter>
            <Hero />
        </BrowserRouter>
    );

describe('Hero', () => {
    it('renders the restaurant name', () => {
        renderHero();
        expect(screen.getByText('Little Lemon')).toBeInTheDocument();
    });

    it('renders the location subtitle', () => {
        renderHero();
        expect(screen.getByText('Chicago')).toBeInTheDocument();
    });

    it('renders the description text', () => {
        renderHero();
        expect(screen.getByText(/family-owned Mediterranean restaurant/i)).toBeInTheDocument();
    });

    it('renders Reserve a Table button with correct link', () => {
        renderHero();
        const reserveBtn = screen.getByText('Reserve a Table');
        expect(reserveBtn).toBeInTheDocument();
        expect(reserveBtn.closest('a')).toHaveAttribute('href', '/booking');
    });

    it('renders View Menu button with correct link', () => {
        renderHero();
        const menuBtn = screen.getByText('View Menu');
        expect(menuBtn).toBeInTheDocument();
        expect(menuBtn.closest('a')).toHaveAttribute('href', '/menu');
    });

    it('renders the rating badge', () => {
        renderHero();
        expect(screen.getByText('4.8')).toBeInTheDocument();
        expect(screen.getByText('★ Rating')).toBeInTheDocument();
    });
});
