import React from 'react';
import { Link } from 'react-router-dom';
import "./MaterialCard.css";

export interface Material {
  MaterialID: number;            // в JSON число
  MaterialName: string;
  MaterialImageURL?: string;     // имя поля как в JSON
  Isotopes?: string;
  SampleRequirements?: string;   // SampleRequirements из JSON
}

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const imageSrc = material.MaterialImageURL; // уже полный URL из бэка

  return (
    <div className="material-card">
      {imageSrc && (
        <div className="card-image-container">
          <img
            src={imageSrc}
            alt={material.MaterialName}
            className="card-image"
          />
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

          {material.SampleRequirements && (
            <div className="sample-size">
              <strong>Рекомендуемый размер выборки:</strong>
              <div>{material.SampleRequirements}</div>
            </div>
          )}
        </div>

        <div className="card_button">
          <Link
            to={`/materials/${material.MaterialID}`}
            className="details-link"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
