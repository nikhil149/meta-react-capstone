export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'starters' | 'mains' | 'desserts' | 'drinks';
    image: string;
}

export const menuItems: MenuItem[] = [
    // Starters
    {
        id: 1,
        name: 'Greek Salad',
        description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic croutons.',
        price: 12.99,
        category: 'starters',
        image: '🥗',
    },
    {
        id: 2,
        name: 'Bruschetta',
        description: 'Our bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
        price: 7.99,
        category: 'starters',
        image: '🍞',
    },
    {
        id: 3,
        name: 'Hummus Platter',
        description: 'Creamy hummus served with warm pita bread, cherry tomatoes, cucumber, and a drizzle of extra virgin olive oil.',
        price: 9.99,
        category: 'starters',
        image: '🫓',
    },
    {
        id: 4,
        name: 'Calamari Fritti',
        description: 'Lightly battered and fried calamari rings served with marinara sauce and a squeeze of fresh lemon.',
        price: 11.99,
        category: 'starters',
        image: '🦑',
    },

    // Mains
    {
        id: 5,
        name: 'Lemon Herb Chicken',
        description: 'Juicy grilled chicken marinated in lemon, herbs, and spices. Served with roasted vegetables and pilaf rice.',
        price: 18.99,
        category: 'mains',
        image: '🍗',
    },
    {
        id: 6,
        name: 'Grilled Sea Bass',
        description: 'Fresh Mediterranean sea bass grilled to perfection, served with sautéed greens and lemon butter sauce.',
        price: 24.99,
        category: 'mains',
        image: '🐟',
    },
    {
        id: 7,
        name: 'Lamb Kofta',
        description: 'Spiced lamb kofta skewers served with tzatziki sauce, fresh salad, and warm flatbread.',
        price: 21.99,
        category: 'mains',
        image: '🥙',
    },
    {
        id: 8,
        name: 'Pasta Primavera',
        description: 'Al dente penne pasta tossed with seasonal vegetables in a light garlic and olive oil sauce with parmesan.',
        price: 16.99,
        category: 'mains',
        image: '🍝',
    },
    {
        id: 9,
        name: 'Moussaka',
        description: 'Traditional layered dish with eggplant, seasoned ground meat, and creamy béchamel sauce, baked to golden perfection.',
        price: 19.99,
        category: 'mains',
        image: '🍖',
    },

    // Desserts
    {
        id: 10,
        name: 'Lemon Dessert',
        description: 'This comes straight from grandma\'s recipe book. Every last ingredient has been sourced and is as authentic as can be imagined.',
        price: 8.99,
        category: 'desserts',
        image: '🍋',
    },
    {
        id: 11,
        name: 'Baklava',
        description: 'Layers of flaky phyllo pastry filled with chopped nuts and sweetened with honey syrup and a hint of cinnamon.',
        price: 9.99,
        category: 'desserts',
        image: '🍯',
    },
    {
        id: 12,
        name: 'Panna Cotta',
        description: 'Silky vanilla panna cotta topped with a vibrant mixed berry compote and fresh mint leaves.',
        price: 7.99,
        category: 'desserts',
        image: '🍮',
    },

    // Drinks
    {
        id: 13,
        name: 'Fresh Lemonade',
        description: 'Freshly squeezed lemons blended with a touch of mint and honey. Served ice-cold and refreshing.',
        price: 4.99,
        category: 'drinks',
        image: '🍋',
    },
    {
        id: 14,
        name: 'Mediterranean Sangria',
        description: 'Our signature sangria made with red wine, fresh fruits, a splash of brandy, and sparkling water.',
        price: 10.99,
        category: 'drinks',
        image: '🍷',
    },
    {
        id: 15,
        name: 'Turkish Coffee',
        description: 'Rich and aromatic Turkish coffee brewed traditionally in a cezve, served with a piece of Turkish delight.',
        price: 5.99,
        category: 'drinks',
        image: '☕',
    },
    {
        id: 16,
        name: 'Herbal Tea',
        description: 'A soothing blend of chamomile, lavender, and honey. The perfect way to end your Mediterranean meal.',
        price: 3.99,
        category: 'drinks',
        image: '🍵',
    },
];
