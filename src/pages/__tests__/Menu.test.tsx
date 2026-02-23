import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Menu from '../Menu';

describe('Menu Page', () => {
    it('renders the page title', () => {
        render(<Menu />);
        expect(screen.getByText('Our Menu')).toBeInTheDocument();
    });

    it('renders the description', () => {
        render(<Menu />);
        expect(screen.getByText(/carefully curated Mediterranean dishes/i)).toBeInTheDocument();
    });

    it('renders all category tabs', () => {
        render(<Menu />);
        expect(screen.getByText(/All/)).toBeInTheDocument();
        expect(screen.getByText(/Starters/)).toBeInTheDocument();
        expect(screen.getByText(/Mains/)).toBeInTheDocument();
        expect(screen.getByText(/Desserts/)).toBeInTheDocument();
        expect(screen.getByText(/Drinks/)).toBeInTheDocument();
    });

    it('shows all menu items by default', () => {
        render(<Menu />);
        expect(screen.getByText('Greek Salad')).toBeInTheDocument();
        expect(screen.getByText('Lemon Herb Chicken')).toBeInTheDocument();
        expect(screen.getByText('Baklava')).toBeInTheDocument();
        expect(screen.getByText('Fresh Lemonade')).toBeInTheDocument();
    });

    it('filters items when clicking Starters tab', () => {
        render(<Menu />);
        const startersTab = screen.getByText(/Starters/);
        fireEvent.click(startersTab);

        expect(screen.getByText('Greek Salad')).toBeInTheDocument();
        expect(screen.getByText('Bruschetta')).toBeInTheDocument();
        expect(screen.queryByText('Lemon Herb Chicken')).not.toBeInTheDocument();
        expect(screen.queryByText('Baklava')).not.toBeInTheDocument();
    });

    it('filters items when clicking Mains tab', () => {
        render(<Menu />);
        fireEvent.click(screen.getByText(/Mains/));

        expect(screen.getByText('Lemon Herb Chicken')).toBeInTheDocument();
        expect(screen.getByText('Grilled Sea Bass')).toBeInTheDocument();
        expect(screen.queryByText('Greek Salad')).not.toBeInTheDocument();
    });

    it('filters items when clicking Desserts tab', () => {
        render(<Menu />);
        fireEvent.click(screen.getByText(/Desserts/));

        expect(screen.getByText('Lemon Dessert')).toBeInTheDocument();
        expect(screen.getByText('Baklava')).toBeInTheDocument();
        expect(screen.queryByText('Lemon Herb Chicken')).not.toBeInTheDocument();
    });

    it('filters items when clicking Drinks tab', () => {
        render(<Menu />);
        fireEvent.click(screen.getByText(/Drinks/));

        expect(screen.getByText('Fresh Lemonade')).toBeInTheDocument();
        expect(screen.getByText('Turkish Coffee')).toBeInTheDocument();
        expect(screen.queryByText('Greek Salad')).not.toBeInTheDocument();
    });

    it('shows all items when clicking All tab after filtering', () => {
        render(<Menu />);

        // Filter first
        fireEvent.click(screen.getByText(/Starters/));
        expect(screen.queryByText('Lemon Herb Chicken')).not.toBeInTheDocument();

        // Click All
        fireEvent.click(screen.getByText(/All/));
        expect(screen.getByText('Lemon Herb Chicken')).toBeInTheDocument();
        expect(screen.getByText('Greek Salad')).toBeInTheDocument();
    });

    it('highlights active category tab', () => {
        render(<Menu />);
        const startersTab = screen.getByText(/Starters/);
        fireEvent.click(startersTab);
        expect(startersTab).toHaveClass('active');
    });
});
