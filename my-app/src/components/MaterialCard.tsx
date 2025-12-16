import React from 'react';
import { Link } from 'react-router-dom';
import "./MaterialCard.css"

export interface Material {
  MaterialID: string;
  MaterialName: string;
  ImageURL?: string;
  Isotopes?: string;
  SampleSize?: string[];
}

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <div className="material-card">
      {/* Убрана общая ссылка card-link */}
      <div className="card-image-container">
        {material.ImageURL && (
          <img 
            src={material.ImageURL} 
            alt={material.MaterialName} 
            className="card-image"
          />
        )}
      </div>
      <div className="card-content">
        <h2 className="card-title">{material.MaterialName}</h2>
        
        {material.Isotopes && (
          <div className="isotopes">{material.Isotopes}</div>
        )}
        
        {material.SampleSize && material.SampleSize.length > 0 && (
          <div className="sample-size">
            <strong>Рекомендуемый размер выборки:</strong>
            {material.SampleSize.map((size, index) => (
              <div key={index}>• {size}</div>
            ))}
          </div>
        )}
        
        {/* Кнопка "Подробнее" - теперь единственная кликабельная область */}
        <Link 
          to={`/material/${material.MaterialID}`} 
          className="details-link"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default MaterialCard;