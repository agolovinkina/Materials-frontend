import React from 'react';
import { Link } from 'react-router-dom';
import useDatingRequest from '../hooks/useDatingRequest';

const CartIcon: React.FC = () => {
    const { datingID, count, loading } = useDatingRequest();

    const isCartActive = datingID !== 0;
    const isCartEmpty = count === 0;
    
    const countStyle: React.CSSProperties = {
        position: 'absolute', 
        top: '0px', 
        right: '0px',
        backgroundColor: '#0066CC', 
        color: 'white', 
        borderRadius: '50%', 
        padding: '2px 6px',
        fontSize: '10px', 
        lineHeight: '1', 
        minWidth: '18px',
        textAlign: 'center',
        fontWeight: 'bold'
    };

    if (loading) {
        const loadingStyle: React.CSSProperties = {
            opacity: 0.5, 
            cursor: 'wait', 
            position: 'relative'
        };

        return (
            <div className="cart" style={loadingStyle}>
                <img src="/src/img/footer.png" alt="Датирование (загрузка)" className="cart-image" />
            </div>
        );
    }

    if (!isCartActive) {
        const inactiveStyle: React.CSSProperties = {
            opacity: 0.4, 
            cursor: 'default', 
            position: 'relative'
        };

        return (
            <div 
                className="cart" 
                title="Для просмотра заявки на датирование необходимо сначала добавить материал"
                style={inactiveStyle} 
            >
                <img src="/src/img/footer.png" alt="Датирование (неактивно)" className="cart-image" />
                
                {isCartEmpty ? null : (
                    <div className="cart-count" style={countStyle}>
                        {count}
                    </div>
                )}
            </div>
        );
    }
    
    const datingLink = `/datinganalysisrequest/${datingID}`; 
    
    const activeLinkStyle: React.CSSProperties = {
        position: 'relative' 
    };

    return (
        <Link 
            to={datingLink} 
            className="cart"
            title={`Просмотреть заявку на датирование #${datingID}`}
            style={activeLinkStyle}
        >
            <img src="/src/img/footer.png" alt="Датирование" className="cart-image" />
            {isCartEmpty ? null : (
                <div 
                    className="cart-count" 
                    style={countStyle}
                >
                    {count}
                </div>
            )}
        </Link>
    );
};

export default CartIcon;