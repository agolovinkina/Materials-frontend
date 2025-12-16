import React from 'react';
import { Link } from 'react-router-dom';


const Header: React.FC = () => (
  <header className="header">
    <div className="header-content">
      <Link to="/materials" className="logo-link">
        <img src="/src/img/image.png" alt="RadioCarbon Dating" className="logo-image" />
      </Link>
      
      
    </div>
  </header>
);

export default Header;