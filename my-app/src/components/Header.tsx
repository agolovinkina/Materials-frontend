import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/default.jpg';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Логотип слева */}
        <Link to="/" className="header-logo">
          <img src={logo} alt="SGS" className="header-logo-image" />
        </Link>

        {/* Навигация справа */}
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">
            Главная
          </Link>
          <Link to="/materials" className="header-nav-link">
            Материалы
          </Link>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
