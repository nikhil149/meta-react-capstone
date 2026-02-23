import type { MenuItem } from '../data/menuData';
import './MenuCard.css';

interface MenuCardProps {
    item: MenuItem;
    index: number;
}

const MenuCard = ({ item, index }: MenuCardProps) => {
    return (
        <article
            className="menu-card"
            style={{ animationDelay: `${index * 0.08}s` }}
        >
            <div className="menu-card-image">
                {item.image}
            </div>
            <div className="menu-card-body">
                <div className="menu-card-header">
                    <h3 className="menu-card-name">{item.name}</h3>
                    <span className="menu-card-price">${item.price.toFixed(2)}</span>
                </div>
                <p className="menu-card-description">{item.description}</p>
                <div className="menu-card-footer">
                    <span className="menu-card-category">{item.category}</span>
                    <span className="menu-card-order">
                        Order for Delivery 🛵
                    </span>
                </div>
            </div>
        </article>
    );
};

export default MenuCard;
