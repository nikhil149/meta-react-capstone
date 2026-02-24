import { useState } from 'react';
import MenuCard from '../components/MenuCard';
import { menuItems } from '../data/menuData';
import './Menu.css';

type Category = 'all' | 'starters' | 'mains' | 'desserts' | 'drinks';

const categories: { key: Category; label: string; emoji: string }[] = [
    { key: 'all', label: 'All', emoji: '🍽️' },
    { key: 'starters', label: 'Starters', emoji: '🥗' },
    { key: 'mains', label: 'Mains', emoji: '🍖' },
    { key: 'desserts', label: 'Desserts', emoji: '🍮' },
    { key: 'drinks', label: 'Drinks', emoji: '🍹' },
];

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('all');

    const filteredItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    return (
        <div className="menu-page">
            <div className="container">
                <header className="menu-hero">
                    <h1 className="section-title">Our Menu</h1>
                    <p>
                        Discover our carefully curated Mediterranean dishes, made with the freshest
                        ingredients and traditional recipes passed down through generations.
                    </p>
                </header>

                <nav className="menu-tabs" aria-label="Menu categories">
                    {categories.map(cat => (
                        <button
                            key={cat.key}
                            className={`menu-tab ${activeCategory === cat.key ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            {cat.emoji} {cat.label}
                        </button>
                    ))}
                </nav>

                <div className="menu-grid">
                    {filteredItems.map((item, idx) => (
                        <MenuCard key={item.id} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
