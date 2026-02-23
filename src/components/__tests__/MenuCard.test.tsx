import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MenuCard from '../MenuCard';
import type { MenuItem } from '../../data/menuData';

const mockItem: MenuItem = {
    id: 1,
    name: 'Greek Salad',
    description: 'A fresh and crispy salad.',
    price: 12.99,
    category: 'starters',
    image: '🥗',
};

describe('MenuCard', () => {
    it('renders the item name', () => {
        render(<MenuCard item={mockItem} index={0} />);
        expect(screen.getByText('Greek Salad')).toBeInTheDocument();
    });

    it('renders the item description', () => {
        render(<MenuCard item={mockItem} index={0} />);
        expect(screen.getByText('A fresh and crispy salad.')).toBeInTheDocument();
    });

    it('renders the formatted price', () => {
        render(<MenuCard item={mockItem} index={0} />);
        expect(screen.getByText('$12.99')).toBeInTheDocument();
    });

    it('renders the item image emoji', () => {
        render(<MenuCard item={mockItem} index={0} />);
        expect(screen.getByText('🥗')).toBeInTheDocument();
    });

    it('renders the category badge', () => {
        render(<MenuCard item={mockItem} index={0} />);
        expect(screen.getByText('starters')).toBeInTheDocument();
    });

    it('renders the order delivery text', () => {
        render(<MenuCard item={mockItem} index={0} />);
        expect(screen.getByText(/Order for Delivery/)).toBeInTheDocument();
    });

    it('applies animation delay based on index', () => {
        const { container } = render(<MenuCard item={mockItem} index={3} />);
        const card = container.querySelector('.menu-card');
        expect(card).toHaveStyle({ animationDelay: '0.24s' });
    });
});
