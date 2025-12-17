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
      {material.ImageURL && (
        <div className="card-image-container">
          <img src={material.ImageURL} alt={material.MaterialName} className="card-image" />
        </div>
      )}
      
      <div className="card-content">
        <div className="card-info">
          <h2 className="card-title">{material.MaterialName}</h2>

          {material.Isotopes && (
            <div className="isotopes">
              {material.Isotopes}
            </div>
          )}

          {material.SampleSize && material.SampleSize.length > 0 && (
            <div className="sample-size">
              <strong>Рекомендуемый размер выборки:</strong>
              <div>
                {material.SampleSize.map((size, index) => (
                  <div key={index}>• {size}</div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="card_button">
        <Link to={`/materials/${material.MaterialID}`} className="details-link">Подробнее</Link>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
